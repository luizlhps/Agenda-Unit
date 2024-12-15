export interface ServiceListedDto {
  id: number;
  name: string;
  duration: string;
  price: number;
  ativo: boolean;
  status: StatusDto;
}

export interface StatusDto {
  name: string;
}
