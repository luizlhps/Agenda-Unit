export interface SystemConfigManagerServiceCreateDto {
  success: boolean | null;
  service: ServiceDto;
}

interface ServiceDto {
  name: string;
  duration: string;
  price: number;
}
