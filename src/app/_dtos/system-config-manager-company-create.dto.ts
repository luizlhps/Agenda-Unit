export interface SystemConfigManagerCompanyCreateDto {
  company: CompanyDto;
}

interface CompanyDto {
  name: string;
  typeCompany: string;
}
