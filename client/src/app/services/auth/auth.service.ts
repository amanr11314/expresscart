import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { User } from '../../shared/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  authErr: any;



  endpoint: string = 'http://localhost:3000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  currentuser = {}

  // Sign-up
  signUp(user: any) {
    console.log('called signup');

    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).subscribe(
      (res: any) => {
        this.authErr = null;
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        this.authErr = err.error?.['message'] || 'Something went wrong'
      }
    );
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);

        this.getUserProfile(res.id).subscribe(
          (data) => {
            this.authErr = null;
            const user = data['data']
            const keys = ['id', 'name', 'email'];
            keys.forEach(key => {
              localStorage.setItem(key, user[key])
            })
            this.isLoggedInSubject.next(true);
            window.location.replace('/')
          });
      },
        (err: HttpErrorResponse) => {

          this.authErr = err.error?.['message'] || 'Something went wrong'
        }
      );
  }


  getToken() {
    return localStorage.getItem('access_token');
  }

  get getUserDetails(): User {
    const user: User = {
      id: localStorage.getItem('id')!,
      name: localStorage.getItem('name')!,
      email: localStorage.getItem('email')!,
    }
    return user;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');

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
    const keys = ['id', 'name', 'email', 'access_token'];
    keys.forEach(key => localStorage.removeItem(key))
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