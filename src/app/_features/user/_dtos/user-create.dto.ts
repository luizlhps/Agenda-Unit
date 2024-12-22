export interface UserCreateDto {
  name: string;
  username: string;
  email: string;
  password: string;
  roleId?: number;
  phone: string;
  companyId?: number;
}
