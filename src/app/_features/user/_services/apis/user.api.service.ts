import { PageResult } from './../../../../_shared/_utils/page-result';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { UserCreateDto } from '../../_dtos/user-create.dto';
import { UserCreatedDto } from '../../_dtos/user-created.dto';
import { UserObtainedDto } from '../../_dtos/user-obtain.dto';
import { UserListDto } from '../../_dtos/user-list.dto';
import { UserListedDto } from '../../_dtos/user-listed.dto';
import { transformDtoQuery } from '../../../../_shared/_utils/transform-dto-query';

@Injectable({
  providedIn: 'root',
})
export class UserServiceApi {
  private httpClient = inject(HttpClient);

  constructor() {}

  register(userCreateDto: UserCreateDto): Observable<UserCreatedDto> {
    return this.httpClient.post<UserCreatedDto>(`${environment.URL_API_BASE}/register`, userCreateDto);
  }

  getInfo() {
    return this.httpClient.get<UserObtainedDto>(`${environment.URL_API_BASE}/me`);
  }

  getAll(userListDto: UserListDto): Observable<PageResult<UserListedDto>> {
    const query = transformDtoQuery(userListDto);
    return this.httpClient.get<PageResult<UserListedDto>>(`${environment.URL_API_BASE}/user${query}`);
  }
}
