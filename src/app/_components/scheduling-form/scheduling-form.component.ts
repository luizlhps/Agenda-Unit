import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SelectFormComponent } from '../form/select-form/select-form.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberFormComponent } from '../form/input-number-form/input-number-form.component';

@Component({
  selector: 'scheduling-form',
  standalone: true,
  imports: [
    SidebarModule,
    CommonModule,
    SelectFormComponent,
    ReactiveFormsModule,
    CalendarModule,
    InputTextFormComponent,
    InputMaskModule,
    InputNumberFormComponent,
  ],
  templateUrl: './scheduling-form.component.html',
  styleUrl: './scheduling-form.component.scss',
})
export class SchedulingFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  protected isEditMode = false;
  protected sidebarVisible = true;

  protected schedulingForm = this.formBuilder.group({
    name: ['sdsd', [Validators.required]],
  });
}
