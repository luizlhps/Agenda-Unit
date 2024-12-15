import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'input-number-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberModule, NgClass],
  templateUrl: './input-number-form.component.html',
  styleUrl: './input-number-form.component.scss',
})
export class InputNumberFormComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() minFractionDigits!: string;
  @Input() maxFractionDigits!: string;
  @Input() mode: 'decimal' | 'currency' = 'currency';
  @Input() formId!: string;
  @Input() placeholder!: string;
  @Input() currency: string = 'BRL';
}
