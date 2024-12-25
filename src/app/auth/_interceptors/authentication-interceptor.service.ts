// authentication.interceptor.ts
import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { SystemConfigurationExceptions } from '../../_shared/_exceptions/system-config-exceptions';
import { SystemConfigurationStepEnum } from '../../_shared/_exceptions/system-config.enums';

export const AuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const authToken = localStorage.getItem('token');

  let authReq = req;

  if (authToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          handle401Error(authReq, next).subscribe();
        }

        if (err.status === 403) {
          if (err.error && typeof err.error.name === 'string' && err.error.name === 'SYSTEM_CONFIG') {
            const errSystem = err.error as SystemConfigurationExceptions;

            switch (errSystem.etapa) {
              case SystemConfigurationStepEnum.CompanyNotCreated:
                if (!window.location.href.includes('system-config/company')) {
                  router.navigate(['system-config']);
                }
                break;

              case SystemConfigurationStepEnum.SchedulingNotCreated:
                router.navigate(['system-config/scheduling'], {
                  queryParams: { step: errSystem.etapa },
                });
                break;

              default:
                console.error('Etapa não tratada:', errSystem.etapa);
                break;
            }
          }
        }

        console.error('HTTP error:', err);
      }

      return throwError(() => err);
    })
  );

  function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    return authService.refreshToken().pipe(
      switchMap((newToken) => {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken.token}`,
          },
        });
        return next(clonedRequest);
      }),
      catchError((err) => {
        console.log('Refresh não ocorreu: ' + err);
        authService.logout();
        return throwError(() => err);
      })
    );
  }
};
