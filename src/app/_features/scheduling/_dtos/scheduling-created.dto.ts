export interface SchedulingCreatedDto {
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
