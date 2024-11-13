import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from './../_services/authentication.service';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { delay, map, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticationService.isAuthenticated().pipe(
      // was added because the application is using ssr, when it start for the first
      // time, the authentication value is null, even if a token is present in localstorage, so, switchmap was"
      // used to wait render the client side, it canmcels the first request and only accepts the second one

      switchMap((isAuthenticated) => {
        if (!isAuthenticated && isPlatformBrowser(this.platformId)) {
          return of(false).pipe(
            delay(0),
            map(() => {
              this.router.navigate(['/login']);
              return false;
            })
          );
        }
        return of(isAuthenticated);
      })
    );
  }
}
