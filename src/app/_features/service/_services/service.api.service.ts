import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceListedDto } from '../_dtos/service-listed.dto';
import { ServiceCreatedDto } from '../_dtos/service-created.dto';
import { ServiceCreateDto } from '../_dtos/service-create.dto';
import { INewServiceApi } from '../../new-service/_interfaces/service.api.interface';
import { ServiceUpdateDto } from '../_dtos/service-update.dto';
import { ServiceUpdatedDto } from '../_dtos/service-updated.dto ';
import { PageResult } from '../../../_shared/_utils/page-result';
import { transformDtoQuery } from '../../../_shared/_utils/transform-dto-query';
import { ServiceListDto } from '../_dtos/service-list.dto';

@Injectable({
  providedIn: 'root',
})
export class ServiceApiService implements INewServiceApi {
  private httpClient = inject(HttpClient);

  constructor() {}

  getAll(serviceListDto?: ServiceListDto): Observable<PageResult<ServiceListedDto>> {
    const query = transformDtoQuery(serviceListDto);
    return this.httpClient.get<PageResult<ServiceListedDto>>(`${environment.URL_API_BASE}/service${query}`);
  }

  createService(serviceCreateDto?: ServiceCreateDto): Observable<ServiceCreatedDto> {
    return this.httpClient.post<ServiceCreatedDto>(`${environment.URL_API_BASE}/service`, serviceCreateDto);
  }

  updateService(serviceUpdateDto: ServiceUpdateDto): Observable<ServiceUpdatedDto> {
    return this.httpClient.put<ServiceUpdatedDto>(
      `${environment.URL_API_BASE}/service/${serviceUpdateDto.id}`,
      serviceUpdateDto
    );
  }
}
