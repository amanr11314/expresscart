import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { AuthService as NewAuthService } from "../swagger-expresscart-client";
import { BehaviorSubject, catchError, switchMap, throwError } from "rxjs";
import { TokenService } from "src/app/token.service";
import { LogoutRequest } from "../swagger-expresscart-client/model/logoutRequest";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private newAuthService: NewAuthService, private tokenService: TokenService) { }

    addTokenHeader(req: HttpRequest<any>, token: string) {
        return req.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.tokenService.getToken();

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

            const logoutReq: LogoutRequest = {
                token
            }

            if (token)
                return this.newAuthService.refreshToken(logoutReq).pipe(
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