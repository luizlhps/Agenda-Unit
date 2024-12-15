import { Observable } from 'rxjs';
import { ServiceCreatedDto } from '../../../_dtos/service-created.dto';
import { ServiceCreateDto } from '../../../_dtos/service-create.dto';

export interface INewServiceApi {
  createService(createService: ServiceCreateDto): Observable<ServiceCreatedDto>;
}
