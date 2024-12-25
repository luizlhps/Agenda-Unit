import { QueryParams } from '../../../_shared/_utils/query-params';

export interface UserListDto extends QueryParams {
  name?: string;
  email?: string;
  username?: string;
  company?: CompanyDto;
}

export interface CompanyDto extends QueryParams {
  id?: number;
}
