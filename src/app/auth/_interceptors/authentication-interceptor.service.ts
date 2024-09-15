// authentication.interceptor.ts
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { SystemConfigurationStepEnum } from '../../_exceptions/system-config.enums';
import { SystemConfigurationExceptions } from '../../_exceptions/system-config-exceptions';

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

              case SystemConfigurationStepEnum.CustomerNotCreated:
                router.navigate(['system-config/schedule?step=customer']);
                break;

              case SystemConfigurationStepEnum.ServiceNotCreated:
                router.navigate(['system-config/schedule?step=service']);
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
};
