import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
    NavigationExtras,
} from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth/auth.service';
import { AuthService as NewAuthService } from '../services/swagger-expresscart-client';
@Injectable({
    providedIn: 'root',
})
export class LoggedInGuard {
    constructor(public newAuthService: NewAuthService, public router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.newAuthService.isLoggedIn === true) {
            this.router.navigate(['home']);
            return false;
            // this.router.navigate(['login']);
        }
        return true;
    }
}