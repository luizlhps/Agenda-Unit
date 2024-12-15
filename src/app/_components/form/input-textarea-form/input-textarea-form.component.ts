import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'input-textarea-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextareaModule, NgClass],
  templateUrl: './input-textarea-form.component.html',
  styleUrl: './input-textarea-form.component.scss',
})
export class InputTextareaFormComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() formId!: string;
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeholder!: string;
  @Input() required = false;
  @Input() cols: number = 30;
  @Input() rows: number = 5;
}
