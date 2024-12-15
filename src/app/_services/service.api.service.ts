import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { transformDtoQuery } from '../../shared/transform-dto-query';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageResult } from '../../shared/page-result';
import { ServiceListDto } from '../_dtos/service-list.dto';
import { ServiceListedDto } from '../_dtos/service-listed.dto';
import { ServiceCreatedDto } from '../_dtos/service-created.dto';
import { ServiceCreateDto } from '../_dtos/service-create.dto';
import { INewServiceApi } from '../_components/new-service/_interfaces/service.api.interface';

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
}
