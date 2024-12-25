export interface SchedulingListedDto {
  id: number;
  date: string;
  notes: string;
  statusId: number;
  cancelNote: string;
  totalPrice: number;
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

interface UserDto {
  name: string;
  username: string;
  role: RoleDto;
  phone: string;
}

interface RoleDto {
  name: string;
}

interface CustomerDto {
  name: string;
  phone: string;
  email: string;
}

interface SchedulingServiceDto {
  serviceId: number;
  schedulingId: number;
  name: string;
  price: number;
  totalPrice: number;
  discount: number;
  isDeleted: boolean;
}

interface StatusDto {
  name: string;
}
