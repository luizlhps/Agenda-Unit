import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, ViewChild, ContentChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { PageResult } from '../../../_utils/page-result';
import { ScrollerOptions } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'select-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DropdownModule],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.scss',
})
export class SelectFormComponent<T> implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onLazyLoad = new EventEmitter<any>();
  @ContentChild('menu') menu!: Menu;

  @Input() label: string = '';
  @Input() id: string = 'dropdown';
  @Input() control!: FormControl;
  @Input() options: T[] | undefined = [];
  @Input() disabled = false;
  @Input() virtualScroll = false;
  @Input() showClear = false;
  @Input() filter = false;
  @Input() lazy = false;
  @Input() loading = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() optionLabel: string = 'name';
  @Input() validationMessage: string = 'Campo obrigatório';
  @Input() placeholder: string = 'Digite no seu placaholder';
  @Input() api!: Observable<PageResult<any>>;
  @Input() virtualScrollItemSize = 1;
  @Input() scrollOptions: ScrollerOptions = {
    delay: 250,
    showLoader: true,
    lazy: true,
  };

  ngOnInit() {
    if (!this.control) {
      console.error('formControl is required for SelectDropdownComponent');
    }
  }
}

//passo a rota
//ele por padrão acessa os page
// caso eu queira passo uma dto para um filtro personalziado
// mas e para um search ? como seria ?
