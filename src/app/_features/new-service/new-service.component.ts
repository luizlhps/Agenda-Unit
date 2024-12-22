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
import { InputNumberModule } from 'primeng/inputnumber';
import { INewServiceApi } from './_interfaces/service.api.interface';
import { ServiceCreateDto } from '../service/_dtos/service-create.dto';
import { ServiceUpdateDto } from '../service/_dtos/service-update.dto';
import { ServiceCreatedDto } from '../service/_dtos/service-created.dto';
import { ServiceUpdatedDto } from '../service/_dtos/service-updated.dto ';
import { SelectFormComponent } from '../../_shared/_components/forms/select-form/select-form.component';
import { durationHoursMinutes } from '../../_shared/_helpers/duration-helper';
import { FormControlPipe } from '../../_shared/_utils/form-control-pipe';
import { handlerErrorBase } from '../../_shared/_utils/handler-error-base';

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
    TooltipModule,
    InputNumberModule,
  ],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.scss',
})
export class NewServiceComponent {
  @Input() mode: 'create' | 'update' = 'create';
  @Input() form!: FormGroup<{
    id: FormControl<number | null>;
    name: FormControl<string | null>;
    hours: FormControl<TimeOption | null>;
    minutes: FormControl<TimeOption | null>;
    price: FormControl<number | null>;
  }>;

  @Input() serviceApi!: INewServiceApi;

  @Output() successHandler: EventEmitter<ServiceUpdatedDto | ServiceCreatedDto> = new EventEmitter();

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

      if (this.mode === 'create') {
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

                  this.successHandler.emit(response);
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

      if (this.mode === 'update' && this.form.controls.id && this.serviceApi.updateService) {
        const serviceUpdateDto: ServiceUpdateDto = {
          id: this.form.controls.id.value ?? 0,
          name: this.form.controls.name.value ?? '',
          price: this.form.controls.price.value ?? 0,
          duration: durationHoursMinutes(hours, minutes),
        };

        this.sub.add(
          this.serviceApi
            .updateService(serviceUpdateDto)
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

                  this.successHandler.emit(response);
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
