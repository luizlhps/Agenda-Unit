export interface UserObtainedDto {
  id: number;
  name: string;
  username: string;
  email: string;
  roleId: number;
  recoveryToken: string | null;
  phone: string;
  companyId: number | null;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  company: UserObtainedCompanyDto;
}

interface UserObtainedCompanyDto {
  id: number;
  name: string;
}
