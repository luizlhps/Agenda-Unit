import { LoginRequestDto } from './../../auth/_dtos/login-request.dto';
import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AuthenticationService } from '../../auth/_services/authentication.service';
import { finalize, take } from 'rxjs';
import { handlerErrorBase } from '../../../shared/handler-error-base';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, RouterLink, FormsModule, ReactiveFormsModule, NgIf],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  loading = false;
  errorMessage: string | null = null;

  protected authForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required /* Validators.minLength(8) */]],
  });

  ngOnInit(): void {
    this.setupFormListeners();
  }

  handleText() {
    console.log('loading');
    this.authService.test().subscribe();
  }

  private setupFormListeners() {
    this.authForm.get('login')?.valueChanges.subscribe(() => {
      this.clearError();
    });

    this.authForm.get('password')?.valueChanges.subscribe(() => {
      this.clearError();
    });
  }

  private clearError() {
    this.errorMessage = null;
  }

  handleLogin() {
    this.authForm.markAllAsTouched();

    if (this.authForm.valid) {
      this.loading = true;

      const loginRequestDto: LoginRequestDto = {
        username: this.authForm.controls.username.value ?? '',
        password: this.authForm.controls.password.value ?? '',
      };

      this.authService
        .login(loginRequestDto)
        .pipe(
          take(1),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (response) => {
            this.router.navigate(['schedule']);
          },
          error: (error) => {
            this.errorMessage = handlerErrorBase(error)?.message ?? 'Ocorreu um erro ao tentar logar';
          },
        });
    }
  }
}
