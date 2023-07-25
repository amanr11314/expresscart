import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
    NavigationExtras,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
@Injectable({
    providedIn: 'root',
})
export class LoggedInGuard {
    constructor(public authService: AuthService, public router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.authService.isLoggedIn === true) {
            this.router.navigate(['home']);
            return false;
            // this.router.navigate(['login']);
        }
        return true;
    }
}