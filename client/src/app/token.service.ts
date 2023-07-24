import { Injectable } from '@angular/core';
import { User } from './shared/User';

const TOKEN_KEY = 'access_token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: User): void {
    localStorage.removeItem(USER_KEY);
    const _user = JSON.stringify(user)
    console.log('setting user = ', _user);
    localStorage.setItem(USER_KEY, _user);
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    console.log('getting user= ', user);

    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
