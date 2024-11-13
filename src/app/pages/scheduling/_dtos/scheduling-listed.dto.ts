export interface SchedulingListedDto {
  id: number;
  date: string;
  notes: string | null;
  statusId: number;
  cancelNote: string | null;
  totalPrice: number | null;
  staffUserId: number;
  serviceId: number;
  companyId: number;
  customerId: number;
  isDeleted: boolean;
  duration: string;
  status: StatusDto;
  customer: CustomerDto;
  schedulingServices: SchedulingServiceDto[];
  user: UserDto;
}

export interface UserDto {
  name: string;
  username: string;
  phone: string;
}

export interface CustomerDto {
  name: string;
  phone: string;
  email: string;
}

export interface SchedulingServiceDto {
  serviceId: number | null;
  schedulingId: number | null;
  name: string;
  price: number | null;
  totalPrice: number | null;
  discount: number | null;
  isDeleted: boolean | null;
}

export interface StatusDto {
  name: string;
}
