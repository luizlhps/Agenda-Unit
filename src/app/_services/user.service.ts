import { UserCreatedDto } from './../_dtos/user-created.dto';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserCreateDto } from '../_dtos/user-create.dto';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  constructor() {}

  register(userCreateDto: UserCreateDto): Observable<UserCreatedDto> {
    return this.httpClient.post<UserCreatedDto>(`${environment.URL_API_BASE}/register`, userCreateDto);
  }
}
