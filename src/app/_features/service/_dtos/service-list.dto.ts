import { QueryParams } from '../../../_shared/_utils/query-params';

export interface ServiceListDto extends QueryParams {
  companyId?: number | null;
}
