export interface SystemConfigManagerCompanyCreatedDto {
  company: CompanyDto;
}

interface CompanyDto {
  name: string;
  typeCompany: string;
}
