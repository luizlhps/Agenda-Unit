import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CalendarComponent } from '@schedule-x/angular';
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import moment from 'moment';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { Sidebar } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { TabViewModule } from 'primeng/tabview';
import { BehaviorSubject, finalize, Subscription } from 'rxjs';
import { SchedulingListDto } from '../../_features/scheduling/_dtos/scheduling-list.dto';
import { SchedulingApiService } from '../../_features/scheduling/_services/scheduling.api.service';
import { SchedulingFormComponent } from '../../_features/scheduling/scheduling-form/scheduling-form.component';
import { ICalendarEvent } from './_interfaces/calendar-event.interface';
import { SchedulingCreatedDto } from '../../_features/scheduling/_dtos/scheduling-created.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [
    CalendarModule,
    CalendarComponent,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    CommonModule,
    TabViewModule,
    RouterModule,
    ProgressSpinnerModule,
    SchedulingFormComponent,
  ],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss',
  providers: [SchedulingApiService, MessageService],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private sub = new Subscription();

  protected endDateCurrent = moment().endOf('month').format('YYYY-MM-DD');
  protected loadingScheduling = false;

  private messageService: MessageService = inject(MessageService);
  private schedulingApi = inject(SchedulingApiService);

  @ViewChild('schedule') schedule!: any;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  private sidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  public sidebarVisible$ = this.sidebarVisibleSubject.asObservable();

  title = 'angular-example';
  calendarApp = createCalendar({
    isResponsive: true,
    locale: 'pt-BR',
    events: [
      {
        start: '2024-12-01',
        end: '2024-12-02',
        people: ['Person 1', 'Person 2'],
        description: 'Description 1',
        id: 1,
      },
    ],
    callbacks: {
      onEventClick: (calendarEvent: any) => {
        console.log('onEventClick', calendarEvent);
        this.toggleSidebarVisibility(true);
      },

      onClickDate: (date) => {
        console.log('onClickDate', date); // e.g. 2024-01-01
        this.toggleSidebarVisibility(true);
      },

      onClickDateTime: (dateTime) => {
        console.log('onClickDateTime', dateTime); // e.g. 2024-01-01 12:37
        this.toggleSidebarVisibility(true);
      },

      onClickAgendaDate(date) {
        console.log('onClickAgendaDate', date); // e.g. 2024-01-01
      },

      onClickPlusEvents(date) {
        console.log('onClickPlusEvents', date); // e.g. 2024-01-01
      },

      onSelectedDateUpdate: (date) => {
        var endDate = moment(date).endOf('month').format('YYYY-MM-DD');

        if (endDate !== this.endDateCurrent) {
          this.fetchShedulingCurrent(date);
          this.endDateCurrent = endDate;
        }
      },
    },
    plugins: [createEventModalPlugin(), createEventsServicePlugin()],
    views: [createViewDay(), createViewMonthAgenda(), createViewMonthGrid(), createViewWeek()],
  });

  ngOnInit(): void {
    this.fetchShedulingCurrent();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  handlerSuccessService(response: SchedulingCreatedDto) {
    this.fetchShedulingCurrent();

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'O Agendamento foi criado!',
    });

    this.toggleSidebarVisibility(false);
  }

  toggleSidebarVisibility(visible: boolean) {
    this.sidebarVisibleSubject.next(visible);
  }

  fetchShedulingCurrent(date?: string) {
    this.loadingScheduling = true;

    var startDate = moment(date).startOf('month').subtract(3, 'days').format('YYYY-MM-DD');
    var endDate = moment(date).endOf('month').add(+4, 'days').format('YYYY-MM-DD');

    const schedulingListDto: SchedulingListDto = {
      startDate: startDate,
      endDate: endDate,
    };

    this.sub.add(
      this.schedulingApi
        .getAll(schedulingListDto)
        .pipe(finalize(() => (this.loadingScheduling = false)))
        .subscribe((res) => {
          if (res.items.length > 0) {
            const items: ICalendarEvent[] = [];

            res.items.forEach((item) => {
              var durationParts = item.duration.split(':');

              var duration = moment.duration({
                hours: parseInt(durationParts[0], 10),
                minutes: parseInt(durationParts[1], 10),
                seconds: parseInt(durationParts[2], 10),
              });

              //TODO: Verificar se ja tem um evento, caso tenha não adicionar mais e sim dar update nele

              const hasMoreThanOneService =
                item.schedulingServices.length > 1 ? item.schedulingServices.length - 1 + '+' : '';

              const dateLocal = moment(item.date).local();

              console.log(dateLocal);

              items.push({
                id: item.id,
                title: item.schedulingServices[0].name + ' ' + hasMoreThanOneService,
                description: item.notes ?? '',
                start: moment(dateLocal).format('YYYY-MM-DD HH:mm'),
                end: moment(dateLocal).add(duration).format('YYYY-MM-DD HH:mm'),
              });

              this.calendarApp.events.set(items);

              console.log(this.calendarApp);
            });
          }
        })
    );
  }
}
