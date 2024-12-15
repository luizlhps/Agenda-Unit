export interface SystemConfigManagerSchedulingCreateDto {
  scheduling: SchedulingDto;
  customer: CustomerDto;
}

export interface CustomerDto {
  name: string;
  phone: string;
  email: string;
}

export interface SchedulingDto {
  date: string;
  duration: string;
  schedulingServices: SchedulingServiceDto;
}

export interface SchedulingServiceDto {
  name: string;
  price: number;
  discount: number;
}
