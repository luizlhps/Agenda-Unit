import { LoginRequestDto } from './../_dtos/login-request.dto';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../_dtos/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private httpClient = inject(HttpClient);

  constructor() {}

  login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.httpClient.post<LoginResponseDto>(`${environment.URL_API_BASE}/login`, loginRequest);
  }
}
