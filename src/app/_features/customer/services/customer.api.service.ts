import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PageResult } from '../../../_shared/_utils/page-result';
import { transformDtoQuery } from '../../../_shared/_utils/transform-dto-query';
import { CustomerListDto } from '../_dtos/customer-list.dto';
import { CustomerListedDto } from '../_dtos/customer-listed.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private httpClient = inject(HttpClient);

  constructor() {}

  getAll(customerListDto?: CustomerListDto): Observable<PageResult<CustomerListedDto>> {
    const query = transformDtoQuery(customerListDto);
    return this.httpClient.get<PageResult<CustomerListedDto>>(`${environment.URL_API_BASE}/customer${query}`);
  }
}
