import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  NavigationExtras,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService as NewAuthService } from '../services/swagger-expresscart-client';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public newAuthService: NewAuthService, public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.newAuthService.isLoggedIn !== true) {
      // window.alert('Access not allowed!');
      const navigationExtras: NavigationExtras = { state: { msg: 'Please login to continue' } };
      this.router.navigate(['login'], navigationExtras);
      return false;
      // this.router.navigate(['login']);
    }
    return true;
  }
}