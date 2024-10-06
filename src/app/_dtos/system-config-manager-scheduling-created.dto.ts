export interface SystemConfigManagerSchedulingCreatedDto {
  scheduling: CompanyDto;
}

interface CompanyDto {
  name: string;
  typeCompany: string;
}
