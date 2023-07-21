import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { BehaviorSubject, catchError, switchMap, tap, throwError } from "rxjs";
import { TokenService } from "src/app/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService, private tokenService: TokenService) { }

    addTokenHeader(req: HttpRequest<any>, token: string) {
        return req.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();

        req = this.addTokenHeader(req, authToken!)

        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes('auth/signin')) {
                    return this.handle401Error(req, next);
                }
                return throwError(error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        console.log('handling 401 Unauthorised error from interceptor');

        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const token = this.tokenService.getRefreshToken();

            if (token)
                return this.authService.refreshToken(token).pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;

                        this.tokenService.saveToken(token.accessToken);
                        this.refreshTokenSubject.next(token.refreshToken);

                        return next.handle(this.addTokenHeader(request, token.accessToken));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        this.tokenService.signOut();
                        return throwError(err);
                    })
                );
        }
        return throwError("Refreshing");
    }

}