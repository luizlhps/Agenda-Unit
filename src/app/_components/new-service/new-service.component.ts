import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  ],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.scss',
})
export class NewServiceComponent {
  private formBuilder = inject(FormBuilder);
  private sub: Subscription = new Subscription();

  loading = false;
  errorMessage: string | null = null;

  hours: TimeOption[] = [];
  minutes: TimeOption[] = [];

  protected form = this.formBuilder.group({
    name: new FormControl('', { validators: [Validators.required] }),
    hours: new FormControl<TimeOption | null>(null, { validators: [Validators.required] }),
    minutes: new FormControl<TimeOption | null>(null, { validators: [Validators.required] }),
    value: new FormControl('', { validators: [Validators.required] }),
  });

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

  onSubmit() {}

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
