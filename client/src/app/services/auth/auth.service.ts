import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/User';
import { TokenService } from 'src/app/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);


  public authErr: any;



  endpoint: string = 'http://localhost:3000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router, private tokenService: TokenService) {
    const user: User = this.tokenService.getUser();
    this.userSubject.next(user);
  }

  currentuser = {}

  // Sign-up
  signUp(user: any, onSignUpCallback?: () => void) {
    console.log('called signup');

    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      complete: () => {
        this.authErr = null;
        onSignUpCallback?.();
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        onSignUpCallback?.();
        this.authErr = err.error?.['message'] || 'Something went wrong'
      }
    });
  }

  refreshToken(token: string) {
    return this.http.post(this.endpoint + '/token', {
      token
    });
  }

  // Sign-in
  signIn(user: User, onSignInCallback?: () => void) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
      .subscribe({
        next: (res: any) => {
          // save token
          this.tokenService.saveToken(res.token)
          this.tokenService.saveRefreshToken(res.refreshToken);

          // getuser details
          this.getUserProfile(res.id).subscribe({
            next: (data) => {
              this.authErr = null;
              const user: User = data['data']
              console.log('userdetails= ', user)
              // save user details
              this.tokenService.saveUser(user);
              // this.isLoggedInSubject.next(true)
            },
            error: (err: any) => {
              onSignInCallback?.();
              console.log('error while fetching user data: ', err)
            }
          })
        },
        complete: () => {
          onSignInCallback?.();
          window.location.replace('/')
          // this.router.navigate(['/'], {
          //   skipLocationChange: true
          // });
        },
        error: (err: HttpErrorResponse) => {
          onSignInCallback?.();
          this.authErr = err.error?.['message'] || 'Something went wrong'
        }
      });
  }


  getToken() {
    return this.tokenService.getToken();
  }

  // get getUserDetails(): User {
  //   const user: User = this.tokenService.getUser();
  //   console.log(user);
  //   return user;
  // }

  public getUserDetails() {
    return this.userSubject;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  get isLoggedIn(): boolean {
    let authToken = this.tokenService.getToken();
    return !!authToken;
  }

  get isLoggedIn$(): Observable<boolean> {
    return of(this.isLoggedIn)
  }

  doLogout() {
    this.http.post(this.endpoint + '/logout', {
      token: this.tokenService.getRefreshToken()
    }).subscribe({
      complete: () => {
        this.tokenService.signOut();
        // window.location.href = '/login'
        this.router.navigate(['/login'], {
          skipLocationChange: true
        });
      }
    })
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}