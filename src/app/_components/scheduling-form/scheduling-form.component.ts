import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { SidebarModule } from 'primeng/sidebar';
import { finalize, Subscription } from 'rxjs';
import { ServiceListedDto } from '../../_dtos/service-listed.dto';
import { ServiceApiService } from '../../_services/service.api.service';
import { InputNumberFormComponent } from '../form/input-number-form/input-number-form.component';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';
import { InputTextareaFormComponent } from '../form/input-textarea-form/input-textarea-form.component';
import { SelectFormComponent } from '../form/select-form/select-form.component';
import { TimeOption } from '../new-service/_interfaces/time-stamp.interface';
import { ServiceListDto } from '../../_dtos/service-list.dto';
import { MenuItem, MessageService, ScrollerOptions } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { NewServiceComponent } from '../new-service/new-service.component';
import { Dialog, DialogModule } from 'primeng/dialog';
import { SystemConfigManagerApiService } from '../../pages/system-config/_services/systemConfigManager.api.service';

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
    InputTextareaFormComponent,
    ButtonModule,
    MenuModule,
    NewServiceComponent,
    DialogModule,
  ],
  providers: [MessageService],
  templateUrl: './scheduling-form.component.html',
  styleUrl: './scheduling-form.component.scss',
})
export class SchedulingFormComponent implements OnInit, OnDestroy {
  @ViewChild('dialog') dialog!: Dialog;

  private readonly formBuilder = inject(FormBuilder);
  readonly serviceApi = inject(ServiceApiService);
  private messageService: MessageService = inject(MessageService);

  loading = false;
  errorMessage: string | null = null;
  modalServiceVisible: boolean = false;

  menuServicesOptions: MenuItem[] | undefined;
  menuSelectedServicesIndex: string = '0';

  //Populate date
  items: ServiceListedDto[] = [];

  //configs
  hours: TimeOption[] = [];
  minutes: TimeOption[] = [];

  scrollOptions: ScrollerOptions = {
    showLoader: false,
    onLazyLoad: this.test.bind(this),
  };

  //forms
  protected schedulingForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    hours: FormControl<TimeOption | null>,
    minutes: FormControl<TimeOption | null>,
    services: this.formBuilder.array<
      FormGroup<{
        service: FormControl<ServiceListedDto | null>;
        value: FormControl<number | null>;
      }>
    >([
      this.formBuilder.group({
        service: this.formBuilder.control<ServiceListedDto | null>(null),
        value: this.formBuilder.control<number | null>(0, Validators.required),
      }),
    ]),
  });

  protected serviceForm = this.formBuilder.group({
    name: new FormControl('', { validators: [Validators.required] }),
    hours: new FormControl<TimeOption | null>({ name: '00 Horas', value: 0 }, { validators: [Validators.required] }),
    minutes: new FormControl<TimeOption | null>(
      { name: '00 Minutos', value: 0 },
      { validators: [Validators.required] }
    ),
    price: new FormControl(0, { validators: [Validators.min(1)] }),
  });

  //Angular
  private sub = new Subscription();
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.onChangeServiceSelected();

    this.initializeServiceMenuOptions();

    this.fetchService();

    //minutes
    for (let i = 0; i <= 55; i += 5) {
      this.minutes.push({
        name: `${String(i).padStart(2, '0')} Minutos`,
        value: i,
      });
    }

    //hours
    for (let i = 0; i <= 24; i++) {
      this.hours.push({
        name: `${String(i).padStart(2, '0')} Horas`,
        value: i,
      });
    }
  }

  protected isEditMode = false;
  protected sidebarVisible = true;

  test(e: any) {
    const serviceListDto: ServiceListDto = {
      paginationProperties: {
        allRows: true,
      },
    };

    console.log(e);
  }

  onChangeServiceSelected(event?: any) {
    this.schedulingForm.controls.services.controls.forEach((serviceGroup: FormGroup, index: number) => {
      const serviceControl = serviceGroup.get('service');

      this.sub.add(
        serviceControl?.valueChanges.subscribe((newService: ServiceListedDto | null) => {
          this.updatePrice(index, newService);
        })
      );
    });
  }

  updatePrice(index: number, newService: ServiceListedDto | null): void {
    const servicesArray = this.schedulingForm.controls.services as FormArray;
    const valueControl = (servicesArray.at(index) as FormGroup).get('value');

    if (newService) {
      valueControl?.setValue(newService.price);
    } else {
      valueControl?.setValue(null);
    }
  }

  addService(service?: ServiceListedDto): void {
    const servicesArray = this.schedulingForm.controls.services;

    const serviceGroup = this.formBuilder.group({
      service: [service ?? null],
      value: [service?.price ?? 0, Validators.required],
    });

    this.sub.add(
      serviceGroup.controls.service?.valueChanges.subscribe((newService: ServiceListedDto | null) => {
        this.updatePrice(servicesArray.length - 1, newService);
      })
    );

    servicesArray.push(serviceGroup);
  }
  removeService(index: number): void {
    const servicesArray = this.schedulingForm.controls.services;

    if (index == 0) {
      this.schedulingForm.controls.services.controls[0].patchValue({
        service: null,
        value: 0,
      });
      return;
    }

    servicesArray.removeAt(index);
  }

  openMenu(menu: Menu, event: MouseEvent, index: number) {
    this.menuSelectedServicesIndex = index.toString();
    this.initializeServiceMenuOptions();
    menu.toggle(event);
  }

  handlerSuccessCreatedService() {
    this.fetchService();
    this.modalServiceVisible = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'O Serviço foi criado!',
    });
  }

  private fetchService() {
    this.loading = true;

    const serviceListDto: ServiceListDto = {
      paginationProperties: {
        allRows: true,
      },
    };

    this.serviceApi
      .getAll(serviceListDto)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.items = res.items;

        this.schedulingForm.controls.services.controls[0].patchValue({
          service: res.items[0],
          value: res.items[0].price,
        });

        //minutes
        for (let i = 0; i <= 55; i += 5) {
          this.minutes.push({
            name: `${String(i).padStart(2, '0')} Minutos`,
            value: i,
          });
        }
      });
  }

  private initializeServiceMenuOptions() {
    this.menuServicesOptions = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Criar Serviço',
            icon: 'pi pi-refresh',
            command: (e: any) => {
              this.modalServiceVisible = true;
              this.dialog.maximize();
            },
            id: this.menuSelectedServicesIndex,
          },
          {
            label: 'Editar Serviço',
            icon: 'pi pi-upload',
          },
        ],
      },
    ];
  }
}
