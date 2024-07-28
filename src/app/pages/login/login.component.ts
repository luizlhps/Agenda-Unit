import { LoginRequestDto } from './../../auth/_dtos/login-request.dto';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AuthenticationService } from '../../auth/_services/authentication.service';
import { finalize } from 'rxjs';

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

  protected authForm = this.formBuilder.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required /* Validators.minLength(8) */]],
  });

  handlePrint() {
    this.authForm.markAllAsTouched();

    if (this.authForm.valid) {
      const loginRequestDto: LoginRequestDto = {
        login: this.authForm.controls.login.value ?? '',
        password: this.authForm.controls.password.value ?? '',
      };

      this.authService
        .login(loginRequestDto)
        .pipe(
          finalize(() => {
            console.log('finally logged in');
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Login success:', response);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
