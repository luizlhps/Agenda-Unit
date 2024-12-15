import { QueryParams } from '../../shared/query-params';

export interface ServiceListDto extends QueryParams {
  companyId?: number | null;
}
