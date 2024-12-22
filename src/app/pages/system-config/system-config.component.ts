import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthenticationService } from '../../auth/_services/authentication.service';
import { LogoSvgComponent } from '../../_shared/_components/logo/logo.component';

@Component({
  selector: 'app-system-config',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    FormsModule,
    LogoSvgComponent,
    ReactiveFormsModule,
    NgIf,
    InputMaskModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './system-config.component.html',
  styleUrl: './system-config.component.scss',
})
export class SystemConfigComponent implements OnInit {
  private authService = inject(AuthenticationService);

  username: string = '';
  loading = false;

  constructor() {}
  ngOnInit(): void {
    this.username = this.authService.userToken?.value?.username ?? '';
  }
}
