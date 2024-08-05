import { LoginResponseDto } from './../../auth/_dtos/login-response.dto';
import { AuthenticationService } from './../../auth/_services/authentication.service';
import { UserService } from './../../_services/user.service';
import { UserCreatedDto } from './../../_dtos/user-created.dto';
import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { UserCreateDto } from '../../_dtos/user-create.dto';
import * as bcrypt from 'bcryptjs';
import { catchError, finalize, of, switchMap } from 'rxjs';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private authenticationService = inject(AuthenticationService);

  loading = false;
  errorMessage: string | null = null;

  protected registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required /* Validators.minLength(8) */]],
    username: ['', [Validators.required /* Validators.minLength(8) */]],
    email: ['', [Validators.required /* Validators.minLength(8) */]],
    phone: ['', [Validators.required /* Validators.minLength(8) */]],
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

      const saltRounds = 10;

      bcrypt.hash(userCreatedDto.password, saltRounds, (err, hash) => {
        if (err) {
          this.loading = false;
        } else {
          userCreatedDto.password = hash;
          userCreatedDto.phone = userCreatedDto.phone.replace(/\D/g, '');

          this.userService
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
                this.router.navigate(['schedule']);
              } else {
                this.errorMessage = 'Falha ao efetuar login';
              }
            });
        }
      });
    }
  }
}
