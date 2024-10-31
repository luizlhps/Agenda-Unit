import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'input-text-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, InputTextModule, NgClass],
  templateUrl: './input-text-form.component.html',
  styleUrl: './input-text-form.component.scss',
})
export class InputTextFormComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() formId!: string;
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeholder!: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input() readonly = false;
}
