import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/_services/authentication.service';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss',
})
export class ScheduleComponent implements OnInit {
  private authService = inject(AuthenticationService);
  ngOnInit(): void {
    this.authService.test().subscribe((data) => console.log(data));
  }
}
