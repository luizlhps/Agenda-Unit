export interface SystemConfigManagerScheduleCreatedDto {
  scheduling: CompanyDto;
}

interface CompanyDto {
  name: string;
  typeCompany: string;
}
