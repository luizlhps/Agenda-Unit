export interface SchedulingListedDto {
  id: number;
  date: string;
  statusId: number;
  totalPrice: number;
  staffUserId: number;
  serviceId: number;
  companyId: number;
  customerId: number;
  isDeleted: boolean;
  duration: string;
  status: { name: string };
  customer: { name: string; phone: string; email: string };
  service: { name: string; duration: string; price: number };
  user: {
    name: string;
    username: string;
    role: { name: string; id: number; timestamp: string; isDeleted: boolean };
    phone: string;
  };
}
