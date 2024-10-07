import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/_services/authentication.service';
import { CalendarModule } from 'primeng/calendar';
import { CalendarComponent } from '@schedule-x/angular';
import { createCalendar, createViewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CalendarModule, CalendarComponent],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss',
})
export class ScheduleComponent implements OnInit {
  title = 'angular-example';
  calendarApp = createCalendar({
    locale: 'pt-BR',
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-06-11 03:00',
        end: '2024-06-11 05:00',
      },
    ],
    views: [createViewWeek()],
  });

  private authService = inject(AuthenticationService);
  ngOnInit(): void {
    this.authService.test().subscribe((data) => console.log(data));
  }
}
