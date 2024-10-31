import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { InputTextFormComponent } from '../../_components/form/input-text-form/input-text-form.component';
import { DividerModule } from 'primeng/divider';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextFormComponent,
    NgOptimizedImage,
    InputMaskModule,
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {
  private formBuilder = inject(FormBuilder);

  protected profile = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required /* Validators.minLength(8) */]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: [''],
  });

  protected address = this.formBuilder.group({
    cep: ['', [Validators.required]],
    street: ['', [Validators.required /* Validators.minLength(8) */]],
    complement: ['', [Validators.required /* Validators.minLength(8) */]],
    neighborhood: ['', [Validators.required /* Validators.minLength(8) */]],
    city: ['', [Validators.required /* Validators.minLength(8) */]],
    number: ['', [Validators.required /* Validators.minLength(8) */]],
    state: ['', [Validators.required /* Validators.minLength(8) */]],
  });
}
