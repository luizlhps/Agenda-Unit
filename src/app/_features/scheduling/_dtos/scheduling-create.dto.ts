export interface SchedulingCreateDto {
  staffUserId: number;
  customerId: number;
  date: string;
  notes?: string;
  duration: string;
  cancelNote?: string;
  discount: number;
  services: SchedulingCreateDtoNamespace.ServiceDto[];
}

export namespace SchedulingCreateDtoNamespace {
  export interface ServiceDto {
    id: number;
  }
}
