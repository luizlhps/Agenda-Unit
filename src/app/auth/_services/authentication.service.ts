import { LoginRequestDto } from './../_dtos/login-request.dto';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginResponseDto } from '../_dtos/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { AuthUser } from '../_dtos/auth-user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private httpClient = inject(HttpClient);
  userToken = new BehaviorSubject<AuthUser | null>(null);

  constructor() {}

  login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.httpClient.post<LoginResponseDto>(`${environment.URL_API_BASE}/login`, loginRequest).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);

        //decode the token
        const decodedToken = jwtDecode<AuthUser>(res.token);
        this.userToken.next(decodedToken);

        console.log(this.userToken);
      })
    );
  }

  test() {
    return this.httpClient.get(`${environment.URL_API_BASE}/users/1`);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userToken.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.userToken.asObservable().pipe(map((user) => user !== null));
  }
}
