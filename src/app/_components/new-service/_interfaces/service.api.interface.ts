import { Observable } from 'rxjs';
import { SystemConfigManagerServiceCreateDto } from '../../../_dtos/system-config-manager-service-create.dto';
import { SystemConfigManagerServiceCreatedDto } from '../../../_dtos/system-config-manager-service-created.dto';

export interface INewServiceApi {
  createService(createService: ServiceCreateDto): Observable<SystemConfigManagerServiceCreatedDto>;
}

export interface ServiceCreateDto {
  name: string;
  duration: string;
  price: number;
}
