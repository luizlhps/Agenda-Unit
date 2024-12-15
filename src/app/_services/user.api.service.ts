import { UserCreatedDto } from '../_dtos/user-created.dto';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserCreateDto } from '../_dtos/user-create.dto';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserObtainedDto } from '../_dtos/user-obtain.dto';

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
}
