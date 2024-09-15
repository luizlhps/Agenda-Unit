import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/_services/authentication.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit {
  private authService = inject(AuthenticationService);
  ngOnInit(): void {
    this.authService.test().subscribe((data) => console.log(data));
  }
}
