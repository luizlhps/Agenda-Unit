import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SchedulingListedDto } from '../_dtos/scheduling-listed.dto';
import { SchedulingListDto } from '../_dtos/scheduling-list.dto';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PageResult } from '../../../_shared/_utils/page-result';
import { transformDtoQuery } from '../../../_shared/_utils/transform-dto-query';
import { ServiceCreateDto } from '../../service/_dtos/service-create.dto';
import { ServiceCreatedDto } from '../../service/_dtos/service-created.dto';
import { SchedulingCreatedDto } from '../_dtos/scheduling-created.dto';
import { SchedulingCreateDto } from '../_dtos/scheduling-create.dto';

@Injectable()
export class SchedulingApiService {
  private httpClient = inject(HttpClient);
  constructor() {}

  getAll(schedulingListDto?: SchedulingListDto): Observable<PageResult<SchedulingListedDto>> {
    const query = transformDtoQuery(schedulingListDto);
    return this.httpClient.get<PageResult<SchedulingListedDto>>(`${environment.URL_API_BASE}/scheduling${query}`);
  }

  create(serviceCreateDto: SchedulingCreateDto): Observable<SchedulingCreatedDto> {
    return this.httpClient.post<SchedulingCreatedDto>(`${environment.URL_API_BASE}/scheduling`, serviceCreateDto);
  }
}
