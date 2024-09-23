import { Dropdown } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  viewChild,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { take, finalize, Subscription } from 'rxjs';
import { handlerErrorBase } from '../../../../shared/handler-error-base';
import { LogoSvgComponent } from '../../../_components/logo/logo.component';
import { SystemConfigManagerCompanyCreateDto } from '../../../_dtos/system-config-manager-company-create.dto';
import { SystemConfigManagerService } from '../../../_services/systemConfigManager.service';
import { SelectFormComponent } from '../../../_components/form/select-form/select-form.component';
import { FormControlPipe } from '../../../../shared/form-control-pipe';
import { TooltipModule } from 'primeng/tooltip';
import { Dialog, DialogModule } from 'primeng/dialog';
import { TimeOption } from '../../../_components/new-service/_interfaces/time-stamp.interface';
import { NewServiceComponent } from '../../../_components/new-service/new-service.component';

import { BreakpointObserver, BreakpointState, LayoutModule } from '@angular/cdk/layout';

interface Services {
  name: string;
  value: string;
}

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    FormsModule,
    LogoSvgComponent,
    ProgressSpinnerModule,
    InputMaskModule,
    ButtonModule,
    SelectFormComponent,
    FormControlPipe,
    TooltipModule,
    DialogModule,
    NewServiceComponent,
    LayoutModule,
  ],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss',
})
export class SchedulingComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private systemConfigManagerService = inject(SystemConfigManagerService);
  private sub: Subscription = new Subscription();
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private breakpointObserver = inject(BreakpointObserver);

  hours: TimeOption[] = [];
  minutes: TimeOption[] = [];
  services: Services[] = [{ name: 'Novo Serviço', value: 'new' }];

  @ViewChild('dialog') dialog!: Dialog;

  loading = false;
  errorMessage: string | null = null;
  modalServiceVisible: boolean = false;

  protected form = this.formBuilder.group({
    name: new FormControl('', { validators: [Validators.required] }),
    value: new FormControl(null, { validators: [Validators.required] }),
    phone: new FormControl('', { validators: [Validators.required] }),
    typeCompany: new FormControl('', { validators: [Validators.required] }),
    hours: new FormControl<TimeOption | null>(null, { validators: [Validators.required] }),
    minutes: new FormControl<TimeOption | null>(null, { validators: [Validators.required] }),
    service: new FormControl<TimeOption | null>(null, { validators: [Validators.required] }),
  });

  ngOnInit() {
    this.fillTimeOptions();
    this.onChangeSelectHours();
    this.onChangeSelectService();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onSubmit() {
    this.form.markAllAsTouched();

    console.log(this.form.controls);

    if (this.form.valid) {
      this.loading = true;

      let systemConfigManagerCompanyCreateDto: SystemConfigManagerCompanyCreateDto = {
        company: {
          name: this.form.controls.name.value ?? '',
          typeCompany: this.form.controls.typeCompany.value ?? '',
        },
      };

      this.sub.add(
        this.systemConfigManagerService
          .registerCompany(systemConfigManagerCompanyCreateDto)
          .pipe(
            take(1),
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (response) => {
              this.router.navigate(['scheduling']);
            },
            error: (error) => {
              this.errorMessage = handlerErrorBase(error)?.message ?? 'Ocorreu um erro, tente novamente mais tarde.';
            },
          })
      );
    }
  }

  showDialog() {
    this.modalServiceVisible = true;
    this.dialogFullScreen();
  }

  private dialogFullScreen() {
    this.dialog.maximize();
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

  private onChangeSelectService() {
    this.sub.add(
      this.form.controls.service.valueChanges.subscribe((valueChanges) => {
        console.log(valueChanges);

        if (valueChanges?.value === 'new') {
          this.showDialog();

          setTimeout(() => {
            this.form.controls.service.setValue(null);
          }, 100);

          this.cdr.detectChanges();
        }
      })
    );
  }

  private fillTimeOptions() {
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
  }
}
