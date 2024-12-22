import { QueryParams } from '../../../_shared/_utils/query-params';

export interface UserListDto extends QueryParams {
  name: string | null;
  email: string | null;
  username: string | null;
  company: CompanyDto | null;
}

export interface CompanyDto extends QueryParams {
  id: number | null;
}
