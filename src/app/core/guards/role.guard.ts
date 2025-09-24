import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const expectedRoles = next.data['roles'] as string[];
    const userRoles = this.authService.getRoles();
    if (this.authService.isAuthenticated() && expectedRoles && userRoles.some(r => expectedRoles.includes(r))) {
      return true;
    } else if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    } else {
      return this.router.createUrlTree(['/forbidden']);
    }
  }
}
