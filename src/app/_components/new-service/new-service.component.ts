import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize, Subscription, take } from 'rxjs';
import { TimeOption } from './_interfaces/time-stamp.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { FormControlPipe } from '../../../shared/form-control-pipe';
import { SelectFormComponent } from '../form/select-form/select-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import * as moment from 'moment';
import { INewServiceApi } from './_interfaces/service.api.interface';
import { SystemConfigManagerApiServiceCreatedDto } from '../../pages/system-config/_dtos/system-config-manager-service-created.dto';
import { SystemConfigManagerApiServiceCreateDto } from '../../pages/system-config/_dtos/system-config-manager-service-create.dto';
import { handlerErrorBase } from '../../../shared/handler-error-base';
import { durationHoursMinutes } from '../../../shared/helpers/duration-helper';
import { ServiceCreateDto } from '../../_dtos/service-create.dto';

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
    price: FormControl<number | null>;
  }>;

  @Input() serviceApi!: INewServiceApi;

  @Output() successHandler: EventEmitter<void> = new EventEmitter();

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
        value: i,
      });
    }

    //hours
    for (let i = 0; i <= 24; i++) {
      this.hours.push({
        name: `${String(i).padStart(2, '0')} Horas`,
        value: i,
      });
    }

    this.onChangeSelectHours();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    console.log(this.form);

    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.errorMessage = null;
      this.loading = true;

      console.log(this.form);

      const hours = this.form.controls.hours.value?.value as number;
      const minutes = this.form.controls.minutes.value?.value as number;

      const serviceCreateDto: ServiceCreateDto = {
        name: this.form.controls.name.value ?? '',
        price: this.form.controls.price.value ?? 0,
        duration: durationHoursMinutes(hours, minutes),
      };

      this.sub.add(
        this.serviceApi
          .createService(serviceCreateDto)
          .pipe(
            take(1),
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (response) => {
              console.log(response);

              if (response) {
                this.loading = false;
                this.errorMessage = null;
                this.form.reset();

                this.successHandler.emit();
              }
            },
            error: (error) => {
              console.log('Falha ao cadastrar o serviço', error);

              const errorResponse = handlerErrorBase(error);

              if (errorResponse?.statusCode == 400 && errorResponse?.errorsFields) {
                this.errorMessage = Object.values(errorResponse?.errorsFields)[0];
                return;
              }

              this.errorMessage = errorResponse?.message ?? 'Falha ao cadastrar o serviço';
            },
          })
      );
    }
  }

  private onChangeSelectHours() {
    this.sub.add(
      this.form.controls.hours.valueChanges.subscribe((valueChanges) => {
        if (valueChanges?.value === 24) {
          this.form.controls.minutes.setValue(this.minutes[0]);
          this.form.controls.minutes.updateValueAndValidity();
          this.form.controls.minutes.disable();
        }

        if (valueChanges?.value !== 24) {
          this.form.controls.minutes.enable();
        }
      })
    );
  }
}
