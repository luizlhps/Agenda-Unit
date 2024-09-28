import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimeOption } from './_interfaces/time-stamp.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { FormControlPipe } from '../../../shared/form-control-pipe';
import { SelectFormComponent } from '../form/select-form/select-form.component';
import { LogoSvgComponent } from '../logo/logo.component';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'new-service',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    ProgressSpinnerModule,
    InputMaskModule,
    ButtonModule,
    SelectFormComponent,
    FormControlPipe,
    TooltipModule,
    InputNumberModule,
  ],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.scss',
})
export class NewServiceComponent {
  @Input() form!: FormGroup<{
    name: FormControl<string | null>;
    hours: FormControl<TimeOption | null>;
    minutes: FormControl<TimeOption | null>;
    value: FormControl<null>;
  }>;

  sub: Subscription = new Subscription();

  loading = false;
  errorMessage: string | null = null;

  hours: TimeOption[] = [];
  minutes: TimeOption[] = [];

  ngOnInit() {
    //minutes
    for (let i = 0; i <= 55; i += 5) {
      this.minutes.push({
        name: `${String(i).padStart(2, '0')} Minutos`,
        value: `${String(i).padStart(2, '0')} Minutes`,
      });
    }

    //hours
    for (let i = 0; i <= 24; i++) {
      this.hours.push({
        name: `${String(i).padStart(2, '0')} Horas`,
        value: `${String(i).padStart(2, '0')} Hours`,
      });
    }

    this.onChangeSelectHours();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.loading = true;

      console.log(this.form);

      /*       const loginRequestDto: LoginRequestDto = {
        username: this.authForm.controls.username.value ?? '',
        password: this.authForm.controls.password.value ?? '',
      };
      this.sub.add(
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
          })
      ); */
    }
  }

  private onChangeSelectHours() {
    this.sub.add(
      this.form.controls.hours.valueChanges.subscribe((valueChanges) => {
        if (valueChanges?.value === '24 Hours') {
          this.form.controls.minutes.setValue(this.minutes[0]);
          this.form.controls.minutes.updateValueAndValidity();
          this.form.controls.minutes.disable();
        }

        if (valueChanges?.value !== '24 Hours') {
          this.form.controls.minutes.enable();
        }
      })
    );
  }
}
