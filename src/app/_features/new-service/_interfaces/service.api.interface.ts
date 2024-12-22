import { Observable } from 'rxjs';
import { ServiceCreatedDto } from '../../service/_dtos/service-created.dto';
import { ServiceCreateDto } from '../../service/_dtos/service-create.dto';
import { ServiceUpdateDto } from '../../service/_dtos/service-update.dto';
import { ServiceUpdatedDto } from '../../service/_dtos/service-updated.dto ';

export interface INewServiceApi {
  createService(createService: ServiceCreateDto): Observable<ServiceCreatedDto>;
  updateService?(serviceUpdateDto: ServiceUpdateDto): Observable<ServiceUpdatedDto>;
}
