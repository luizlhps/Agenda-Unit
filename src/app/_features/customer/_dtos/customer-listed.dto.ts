export interface CustomerListedDto {
  id: number;
  name: string;
  phone: string;
  email: string;
  companyId: number;
  schedulings: SchedulingDto[] | null;
}

export interface SchedulingDto {
  id: number;
  statusId: number;
  staffUserId: number;
  companyId: number;
  customerId: number;
  date: string;
  notes: string | null;
  duration: string;
  cancelNote: string | null;
  totalPrice: number;
  discount: number;
}
