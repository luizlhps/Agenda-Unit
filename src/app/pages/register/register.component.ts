import { LoginResponseDto } from './../../auth/_dtos/login-response.dto';
import { AuthenticationService } from './../../auth/_services/authentication.service';
import { UserCreatedDto } from '../../_features/user/_dtos/user-created.dto';
import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { UserCreateDto } from '../../_features/user/_dtos/user-create.dto';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserServiceApi } from '../../_features/user/_services/apis/user.api.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    InputMaskModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private userServiceApi = inject(UserServiceApi);
  private authenticationService = inject(AuthenticationService);

  loading = false;
  errorMessage: string | null = null;

  protected registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
  });

  handleRegister() {
    this.registerForm.markAllAsTouched();

    console.log(this.registerForm.controls);

    if (this.registerForm.valid) {
      this.loading = true;

      let userCreatedDto: UserCreateDto = {
        name: this.registerForm.controls.name.value ?? '',
        password: this.registerForm.controls.password.value ?? '',
        email: this.registerForm.controls.email.value ?? '',
        phone: this.registerForm.controls.phone.value ?? '',
        username: this.registerForm.controls.username.value ?? '',
      };

      userCreatedDto.phone = userCreatedDto.phone.replace(/\D/g, '');

      this.userServiceApi
        .register(userCreatedDto)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          switchMap((response) =>
            this.authenticationService.login({
              username: userCreatedDto.username,
              password: userCreatedDto.password,
            })
          ),
          catchError((error) => {
            this.errorMessage = error.error.message;
            console.log(error);
            return of(null); // Continue the observable chain with a null value
          })
        )
        .subscribe((loginResponse) => {
          if (loginResponse) {
            this.router.navigate(['scheduling']);
          }
        });
    }
  }
}
