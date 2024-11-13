import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../auth/_services/authentication.service';
import { CalendarModule } from 'primeng/calendar';
import { CalendarComponent } from '@schedule-x/angular';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { LogoSvgComponent } from '../../_components/logo/logo.component';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SchedulingApiService } from './_services/scheduling.api.service';
import { SchedulingListDto } from './_dtos/scheduling-list.dto';
import moment from 'moment';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { finalize, Subscription } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ICalendarEvent } from './_interfaces/calendar-event.interface';
import { SchedulingFormComponent } from '../../_components/scheduling-form/scheduling-form.component';

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
    RouterLinkActive,
    RouterLink,
    RouterModule,
    ProgressSpinnerModule,
    SchedulingFormComponent,
  ],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss',
  providers: [SchedulingApiService],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private sub = new Subscription();

  protected endDateCurrent = moment().endOf('month').format('YYYY-MM-DD');
  protected loadingScheduling = false;

  private schedulingApi = inject(SchedulingApiService);

  @ViewChild('schedule') schedule!: any;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  sidebarVisible: boolean = true;
  title = 'angular-example';
  calendarApp = createCalendar({
    isResponsive: true,
    locale: 'pt-BR',
    events: [],
    callbacks: {
      onEventClick(calendarEvent: any) {
        console.log('onEventClick', calendarEvent);
      },

      onClickDate(date) {
        console.log('onClickDate', date); // e.g. 2024-01-01
      },

      onClickDateTime(dateTime) {
        console.log('onClickDateTime', dateTime); // e.g. 2024-01-01 12:37
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

              items.push({
                id: item.id,
                title: item.schedulingServices[0].name + ' ' + hasMoreThanOneService,
                description: item.notes ?? '',
                start: moment(item.date).format('YYYY-MM-DD HH:mm'),
                end: moment(item.date).add(duration).format('YYYY-MM-DD HH:mm'),
              });
            });

            this.calendarApp.events.set(items);
          }
        })
    );
  }
}
