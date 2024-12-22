import { QueryParams } from '../../../_shared/_utils/query-params';

export interface SchedulingListDto extends QueryParams {
  date?: string;
  startDate?: string;
  endDate?: string;
  id?: number;
  statusId?: number;
  totalPrice?: number;
  staffUserId?: number;
  serviceId?: number;
  companyId?: number;
  customerId?: number;
  duration?: string;
}
