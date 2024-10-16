import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SchedulingListedDto } from '../_dtos/scheduling-listed.dto';
import { SchedulingListDto } from '../_dtos/scheduling-list.dto';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { transformDtoQuery } from '../../../../shared/transform-dto-query';
import { PageResult } from '../../../../shared/page-result';

@Injectable()
export class SchedulingApiService {
  private httpClient = inject(HttpClient);
  constructor() {}

  getAll(schedulingListDto?: SchedulingListDto): Observable<PageResult<SchedulingListedDto>> {
    const query = transformDtoQuery(schedulingListDto);
    return this.httpClient.get<PageResult<SchedulingListedDto>>(`${environment.URL_API_BASE}/scheduling${query}`);
  }
}
