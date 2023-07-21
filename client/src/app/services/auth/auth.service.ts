import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  authErr: any;



  endpoint: string = 'http://localhost:3000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router, private tokenService: TokenService) { }

  currentuser = {}

  // Sign-up
  signUp(user: any) {
    console.log('called signup');

    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      complete: () => {
        this.authErr = null;
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.authErr = err.error?.['message'] || 'Something went wrong'
      }
    });
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
      .subscribe({
        next: (res: any) => {
          // save token
          this.tokenService.saveToken(res.token)

          // getuser details
          this.getUserProfile(res.id).subscribe({
            next: (data) => {
              this.authErr = null;
              const user: User = data['data']
              // save user details
              this.tokenService.saveUser(user);
              this.isLoggedInSubject.next(true)
            },
            error: (err: any) => {
              console.log('error while fetching user data: ', err)
            }
          })
        },
        complete: () => {
          window.location.replace('/')
        },
        error: (err: HttpErrorResponse) => {
          this.authErr = err.error?.['message'] || 'Something went wrong'
        }
      });
  }


  getToken() {
    return this.tokenService.getToken();
  }

  get getUserDetails(): User {
    const user: User = this.tokenService.getUser();
    return user;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  get isLoggedIn(): boolean {
    let authToken = this.tokenService.getToken();

    if (authToken !== null) {
      // check expiry
      if (this.tokenExpired(authToken)) {
        return false;
      }
      return true;
    }
    return false;
  }

  doLogout() {
    this.tokenService.signOut();
    window.location.href = '/login'
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