import { SystemConfigManagerCompanyCreateDto } from '../_dtos/system-config-manager-company-create.dto';
import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { finalize, take } from 'rxjs';
import { SystemConfigManagerApiService } from '../_services/systemConfigManager.api.service';
import { LogoSvgComponent } from '../../../_shared/_components/logo/logo.component';
import { handlerErrorBase } from '../../../_shared/_utils/handler-error-base';

@Component({
  selector: 'app-company',
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
    LogoSvgComponent,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private SystemConfigManagerApiService = inject(SystemConfigManagerApiService);

  loading = false;
  errorMessage: string | null = null;

  protected form = this.formBuilder.group({
    name: ['', [Validators.required]],
    typeCompany: ['', [Validators.required, Validators.minLength(2)]],
  });

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

      this.SystemConfigManagerApiService.registerCompany(systemConfigManagerCompanyCreateDto)
        .pipe(
          take(1),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (response) => {
            this.router.navigate(['system-config/scheduling']);
          },
          error: (error) => {
            this.errorMessage = handlerErrorBase(error)?.message ?? 'Ocorreu um erro, tente novamente mais tarde.';
          },
        });
    }
  }
}
