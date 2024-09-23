export interface SystemConfigManagerScheduleCreateDto {
  Scheduling: SchedulingDto;
}

interface SchedulingDto {
  name: string;
  typeCompany: string;
}
