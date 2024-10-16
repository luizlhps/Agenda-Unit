import { LoginRequestDto } from './../_dtos/login-request.dto';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginResponseDto } from '../_dtos/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { AuthUser } from '../_dtos/auth-user.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  userToken = new BehaviorSubject<AuthUser | null>(null);

  constructor() {}

  login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.httpClient.post<LoginResponseDto>(`${environment.URL_API_BASE}/login`, loginRequest).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);

        //decode the token
        const decodedToken = jwtDecode<AuthUser>(res.token);
        this.userToken.next(decodedToken);
      })
    );
  }

  test() {
    return this.httpClient.get(`${environment.URL_API_BASE}/users/1`);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userToken.next(null);

    this.router.navigate(['/login']);
  }

  autoLogin(): void {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      const decodedToken = jwtDecode<AuthUser>(authToken);
      this.userToken.next(decodedToken);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.userToken.asObservable().pipe(map((user) => user !== null));
  }

  refreshToken(): Observable<LoginResponseDto> {
    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.asObservable();
    } else {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      return this.httpClient
        .post<LoginResponseDto>(`${environment.URL_API_BASE}/refresh-token`, { refreshToken: this.getRefreshToken() })
        .pipe(
          tap((response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.token);

            const decodedToken = jwtDecode<AuthUser>(response.token);
            this.userToken.next(decodedToken);

            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(response.token);
          })
        );
    }
  }

  haveToken(): boolean {
    const authToken = localStorage.getItem('token');

    return !!authToken;
  }
  private getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }
}
