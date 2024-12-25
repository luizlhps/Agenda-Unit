import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { SidebarModule } from 'primeng/sidebar';
import { finalize, forkJoin, Observable, Subscription } from 'rxjs';
import { ServiceListedDto } from '../../service/_dtos/service-listed.dto';
import { ServiceApiService } from '../../service/_services/service.api.service';
import { CustomerListDto } from './../../customer/_dtos/customer-list.dto';
import { UserServiceApi } from './../../user/_services/apis/user.api.service';
import { SchedulingApiService } from './../_services/scheduling.api.service';

import moment from 'moment';
import { MenuItem, MessageService, ScrollerOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { InputNumberFormComponent } from '../../../_shared/_components/forms/input-number-form/input-number-form.component';
import { InputTextFormComponent } from '../../../_shared/_components/forms/input-text-form/input-text-form.component';
import { InputTextareaFormComponent } from '../../../_shared/_components/forms/input-textarea-form/input-textarea-form.component';
import { SelectFormComponent } from '../../../_shared/_components/forms/select-form/select-form.component';
import { durationValidator } from '../../../_shared/_validators/duration-validator';
import { CustomerListedDto } from '../../customer/_dtos/customer-listed.dto';
import { CustomerApiService } from '../../customer/services/customer.api.service';
import { TimeOption } from '../../new-service/_interfaces/time-stamp.interface';
import { NewServiceComponent } from '../../new-service/new-service.component';
import { ServiceCreatedDto } from '../../service/_dtos/service-created.dto';
import { ServiceListDto } from '../../service/_dtos/service-list.dto';
import { ServiceUpdatedDto } from '../../service/_dtos/service-updated.dto ';
import { UserListDto } from '../../user/_dtos/user-list.dto';
import { UserListedDto } from '../../user/_dtos/user-listed.dto';
import { SchedulingCreateDto, SchedulingCreateDtoNamespace } from '../_dtos/scheduling-create.dto';
import { durationHoursMinutes } from '../../../_shared/_helpers/duration-helper';
import { SchedulingCreatedDto } from '../_dtos/scheduling-created.dto';
import { handlerErrorBase } from '../../../_shared/_utils/handler-error-base';

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
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './scheduling-form.component.html',
  styleUrl: './scheduling-form.component.scss',
})
export class SchedulingFormComponent implements OnInit, OnDestroy {
  @ViewChild('dialog') dialog!: Dialog;
  @Output() successHandler: EventEmitter<SchedulingCreatedDto> = new EventEmitter();
  @Input() sidebarVisible$!: Observable<boolean>;
  sidebarVisible: boolean = false;

  private readonly formBuilder = inject(FormBuilder);

  readonly serviceApi = inject(ServiceApiService);
  readonly userApi = inject(UserServiceApi);
  readonly customerApi = inject(CustomerApiService);
  readonly schedulingApi = inject(SchedulingApiService);

  private messageService: MessageService = inject(MessageService);

  loading = false;
  errorMessage: string | null = null;
  modalServiceVisible: boolean = false;

  serviceFormMode: 'create' | 'update' = 'create';

  protected isEditMode = false;

  //Populate options
  items: ServiceListedDto[] = [];
  itemsEmployees: UserListedDto[] = [];
  itemsCustomer: CustomerListedDto[] = [];

  menuServicesOptions: MenuItem[] | undefined;
  menuSelectedServicesIndex = 0;

  //configs
  hours: TimeOption[] = [];
  minutes: TimeOption[] = [];

  scrollOptions: ScrollerOptions = {
    showLoader: false,
  };

  //forms
  protected schedulingForm = this.formBuilder.group({
    duration: this.formBuilder.group(
      {
        hours: new FormControl<TimeOption | null>(null, Validators.required),
        minutes: new FormControl<TimeOption | null>(null, Validators.required),
      },
      { validators: [durationValidator()] }
    ),
    customer: this.formBuilder.group(
      {
        selected: new FormControl<CustomerListedDto | null>(null, Validators.required),
        phone: new FormControl({ value: '', disabled: true }),
        email: new FormControl({ value: '', disabled: true }, [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]),
      },
      { validators: [Validators.required] }
    ),
    observation: new FormControl(''),
    employer: new FormControl<UserListedDto | null>(null, { validators: [Validators.required] }),
    discount: new FormControl(0),
    valueTotal: new FormControl({ value: 0, disabled: true }),
    price: new FormControl(0, { validators: [Validators.min(1)] }),
    date: new FormControl(new Date(), [Validators.required]),

    services: this.formBuilder.array<
      FormGroup<{
        service: FormControl<ServiceListedDto | null>;
        value: FormControl<number | null>;
      }>
    >([
      this.formBuilder.group({
        service: this.formBuilder.control<ServiceListedDto | null>(null, [Validators.required]),
        value: this.formBuilder.control<number | null>(
          { value: 0, disabled: true },
          { validators: [Validators.required, Validators.min(1)] }
        ),
      }),
    ]),
  });

  protected serviceForm = this.formBuilder.group({
    id: new FormControl<number | null>(null),
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
    this.sub.add(
      this.sidebarVisible$.subscribe((value) => {
        this.sidebarVisible = value;
      })
    );

    this.onChangeServiceSelected();
    this.onChangeCustomerSelected();
    this.onChangeDiscount();
    this.onChangePrice();

    this.initializeServiceMenuOptions();

    this.fetchApis();

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

    this.schedulingForm.patchValue({
      duration: {
        hours: this.hours[0],
        minutes: this.minutes[0],
      },
    });
  }

  onSubmit() {
    this.schedulingForm.markAllAsTouched();
    this.errorMessage = null;

    const services: SchedulingCreateDtoNamespace.ServiceDto[] = [];

    this.schedulingForm.value.services?.forEach((service) => {
      services.push({ id: service.service?.id ?? 0 });
    });

    const hours = this.schedulingForm.value.duration?.hours?.value ?? 0;
    const minutes = this.schedulingForm.value.duration?.minutes?.value ?? 0;

    if (this.schedulingForm.valid) {
      const schedulingCreateDto: SchedulingCreateDto = {
        staffUserId: this.schedulingForm.value.employer?.id ?? 0,
        customerId: this.schedulingForm.value.customer?.selected?.id ?? 0,
        date: this.schedulingForm.value.date?.toISOString() ?? '',
        discount: this.schedulingForm.value.discount ?? 0,
        services: services,
        duration: durationHoursMinutes(hours, minutes),
      };

      this.schedulingApi
        .create(schedulingCreateDto)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (res) => {
            this.successHandler.emit(res);
          },
          error: (error) => {
            this.errorMessage = handlerErrorBase(error)?.message ?? 'Ocorreu um erro ao tentar criar';
          },
        });
    }
  }

  onChangeServiceSelected(event?: any) {
    this.schedulingForm.controls.services.controls.forEach((serviceGroup: FormGroup, index: number) => {
      const serviceControl = serviceGroup.get('service');

      this.sub.add(
        serviceControl?.valueChanges.subscribe((newService: ServiceListedDto | null) => {
          this.updatePrice(index, newService);
          this.updateDuration();
        })
      );
    });
  }
  onChangeCustomerSelected() {
    this.sub.add(
      this.schedulingForm.controls.customer.controls.selected.valueChanges.subscribe((value) => {
        this.schedulingForm.controls.customer.controls.email.patchValue(value?.email ?? '');
        this.schedulingForm.controls.customer.controls.phone.patchValue(value?.phone ?? '');
      })
    );
  }

  onChangePrice() {
    const priceControl = this.schedulingForm.controls.price;

    priceControl?.valueChanges.subscribe(() => {
      this.updateTotalValue();
    });
  }

  onChangeDiscount() {
    const discountControl = this.schedulingForm.controls.discount;
    this.sub.add(
      discountControl?.valueChanges.subscribe(() => {
        this.updateTotalValue();
      })
    );
  }

  updatePrice(index: number, newService: ServiceListedDto | null): void {
    const servicesArray = this.schedulingForm.controls.services;

    const valueControl = (servicesArray.at(index) as FormGroup).get('value');

    if (newService) {
      valueControl?.setValue(newService.price);
    } else {
      valueControl?.setValue(null);
    }

    this.updateTotalValue();
  }

  addService(service?: ServiceListedDto): void {
    const servicesArray = this.schedulingForm.controls.services;

    const indexBefore = this.schedulingForm.controls.services.length - 1;
    const isServiceNull = servicesArray.controls[indexBefore].value.service == null;

    if (!isServiceNull) {
      const serviceGroup = this.formBuilder.group({
        service: [service ?? null],
        value: [{ value: service?.price ?? 0, disabled: true }],
      });

      servicesArray.push(serviceGroup);

      const indexCurrent = this.schedulingForm.controls.services.length - 1;

      this.sub.add(
        serviceGroup.controls.service?.valueChanges.subscribe((newService: ServiceListedDto | null) => {
          this.updatePrice(indexCurrent, newService);
          this.updateDuration();
        })
      );
    }
  }
  removeService(index: number): void {
    const servicesArray = this.schedulingForm.controls.services;

    const secondService = servicesArray.controls?.[1];

    if (index == 0 && !secondService) {
      this.schedulingForm.controls.services.controls[0].patchValue({
        service: null,
        value: 0,
      });

      this.updateDuration();
      return;
    }

    servicesArray.removeAt(index);
    this.updateDuration();
  }

  openMenu(menu: Menu, event: MouseEvent, index: number) {
    this.menuSelectedServicesIndex = index;
    this.initializeServiceMenuOptions();
    menu.toggle(event);
  }

  handlerSuccessService(response: ServiceUpdatedDto | ServiceCreatedDto) {
    this.fetchApis();
    this.modalServiceVisible = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: this.serviceFormMode === 'create' ? 'O Serviço foi criado!' : 'O Serviço foi atualizado!',
    });

    const serviceControl = this.schedulingForm.controls.services.controls[this.menuSelectedServicesIndex];
    const service = serviceControl.value.service;

    if (service) {
      serviceControl.patchValue({
        service: {
          ...service,
          ...response,
        },
        value: response.price,
      });
    }

    this.updateDuration();
  }

  private fetchApis() {
    this.loading = true;

    const serviceListDto: ServiceListDto = {
      paginationProperties: {
        allRows: true,
      },
    };

    const userListDto: UserListDto = {
      paginationProperties: {
        allRows: true,
      },
    };

    const customerListDto: CustomerListDto = {
      paginationProperties: {
        allRows: true,
      },
    };

    forkJoin([
      this.serviceApi.getAll(serviceListDto),
      this.userApi.getAll(userListDto),
      this.customerApi.getAll(customerListDto),
    ])
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(([serviceRes, userRes, customerRes]) => {
        this.items = serviceRes.items;
        this.itemsEmployees = userRes.items;
        this.itemsCustomer = customerRes.items;

        const isFirstControlNull = this.schedulingForm.controls.services.controls[0].value.service == null;

        if (isFirstControlNull) {
          this.schedulingForm.controls.services.controls[0].patchValue({
            service: serviceRes.items[0],
            value: serviceRes.items[0].price,
          });
        }

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
              this.serviceFormMode = 'create';
              this.serviceForm.reset();
            },
          },
        ],
      },
    ];

    if (this.schedulingForm.controls.services.controls[this.menuSelectedServicesIndex].value.service) {
      this.menuServicesOptions[0].items?.push({
        label: 'Editar Serviço',
        icon: 'pi pi-upload',
        command: (e: any) => {
          this.openServiceEdit();
        },
      });
    }
  }

  private openServiceEdit() {
    this.modalServiceVisible = true;
    this.dialog.maximize();

    const service = this.schedulingForm.controls.services.controls[this.menuSelectedServicesIndex].value.service;
    if (service) {
      var durationParts = service.duration.split(':');

      var duration = moment.duration({
        hours: parseInt(durationParts[0], 10),
        minutes: parseInt(durationParts[1], 10),
        seconds: parseInt(durationParts[2], 10),
      });

      this.serviceForm.setValue({
        id: service.id,
        price: service?.price ?? 0,
        name: service?.name ?? '',
        hours: this.hours.find((hours) => hours.value == duration.asHours()) ?? this.hours[0],
        minutes: this.minutes.find((minutes) => minutes.value == duration.asHours()) ?? this.minutes[0],
      });

      this.serviceFormMode = 'update';
    }
  }

  private updateTotalValue() {
    const discount = this.schedulingForm.controls.discount.value ?? 0;
    const price = this.schedulingForm.controls.price.value ?? 0;

    this.schedulingForm.patchValue({
      valueTotal: price - discount >= 0 ? price - discount : 0,
    });
  }

  private updateDuration() {
    let maxDuration = moment.duration();
    let totalValue = 0;

    this.schedulingForm.controls.services.value.forEach((serviceValue) => {
      const serviceDuration = moment.duration(serviceValue.service?.duration);
      maxDuration.add(serviceDuration);
      totalValue += serviceValue.service?.price ?? 0;
    });

    const discount = this.schedulingForm.controls.discount.value ?? 0;

    this.schedulingForm.patchValue({
      duration: {
        hours: this.hours.find((hours) => hours.value == maxDuration.asHours()) ?? this.hours[0],
        minutes: this.minutes.find((minutes) => minutes.value == maxDuration.asHours()) ?? this.minutes[0],
      },
      price: totalValue,
      valueTotal: totalValue - discount >= 0 ? totalValue - discount : 0,
    });
  }
}
