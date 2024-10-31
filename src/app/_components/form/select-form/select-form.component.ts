import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'select-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DropdownModule],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.scss',
})
export class SelectFormComponent<T> implements OnInit {
  @Input() label: string = '';
  @Input() id: string = 'dropdown';
  @Input() control!: FormControl;
  @Input() options: T[] = [];
  @Input() disabled = false;
  @Input() required = false;
  @Input() readonly = false;
  @Output() onChange: EventEmitter<T> = new EventEmitter();
  @Input() optionLabel: string = 'name';
  @Input() validationMessage: string = 'Campo obrigatório';
  @Input() placeholder: string = 'Digite no seu placaholder';

  ngOnInit() {
    if (!this.control) {
      console.error('formControl is required for SelectDropdownComponent');
    }
  }
}
