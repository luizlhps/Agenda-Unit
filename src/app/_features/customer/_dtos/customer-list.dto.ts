import { QueryParams } from '../../../_shared/_utils/query-params';

export interface CustomerListDto extends QueryParams {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  companyId?: number;
}
