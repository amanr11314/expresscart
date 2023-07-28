import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService as NewAuthService } from '../../services/swagger-expresscart-client'
import { Router } from '@angular/router';
import { SignInRequest } from 'src/app/services/swagger-expresscart-client/model/signInRequest';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {

  msg?: string;
  isLoading: boolean = false;
  authErr?: string;

  formLoginUser!: FormGroup
  constructor(
    private newAuthService: NewAuthService,
    public router: Router,
    private tokenService: TokenService
  ) {

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { msg: string };
    if (state) this.msg = state.msg;

    this.formLoginUser = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  ngOnInit(): void { }

  onSignInCallback = () => {
    this.isLoading = false;
  };

  loginUser() {
    if (this.formLoginUser.valid) {
      this.isLoading = true;
      this.signIn();

    } else {
      console.log('Invalid input');
      this.formLoginUser.markAllAsTouched();
    }
  }

  signIn() {
    const signInRequest: SignInRequest = this.formLoginUser.value
    this.newAuthService.signIn(signInRequest, 'response').subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          const signInResp = resp.body;
          this.tokenService.saveToken(signInResp?.token);
          this.tokenService.saveRefreshToken(signInResp?.refreshToken)

          // get user details
          this.newAuthService.getUser(signInResp?.id, 'response').subscribe({
            next: (userDetailResp) => {
              this.authErr = undefined;
              const userDetails = userDetailResp.body?.data;

              // save user details
              this.tokenService.saveUser(userDetails!);
            },
            error: (err: any) => {
              this.onSignInCallback();

              console.log('error while fetching user data: ', err)
            }
          })
        }
      },
      complete: () => {
        this.onSignInCallback();
        window.location.replace('/')
      },
      error: (err) => {
        this.onSignInCallback();
        this.authErr = err.error?.['message'] || 'Something went wrong'
      }
    })
  }

  get getEmailError() {
    return (this.formLoginUser?.get('email')?.invalid &&
      (this.formLoginUser?.get('email')?.dirty ||
        this.formLoginUser?.get('email')?.touched) &&
      this.formLoginUser.get('email')?.errors)
      ?
      (this.formLoginUser.get('email')?.errors?.['required'] ?
        "Email is required" :
        (this.formLoginUser.get('email')?.errors?.['email']) ?
          "Email must be a valid email address" : "") :
      "";
  }

  get getPasswordError() {
    return (this.formLoginUser?.get('password')?.invalid &&
      (this.formLoginUser?.get('password')?.dirty ||
        this.formLoginUser?.get('password')?.touched) &&
      this.formLoginUser.get('password')?.errors)
      ?
      (this.formLoginUser.get('password')?.errors?.['required'] ?
        "Password is required" :
        (this.formLoginUser.get('password')?.errors?.['minlength']) ?
          "Password must be at least 6 characters long" : "") :
      ""
  }

}
