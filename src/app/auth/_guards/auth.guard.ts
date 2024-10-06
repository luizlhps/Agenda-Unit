import { AuthenticationService } from './../_services/authentication.service';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authenticationService = inject(AuthenticationService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log(this.authenticationService.userToken);
    console.log(this.authenticationService.isAuthenticated());

    return this.authenticationService.userToken.pipe(
      map((user) => {
        if (!user) {
          this.authenticationService.logout();
          return false;
        }

        return !!user;
      })
    );
  }
}
