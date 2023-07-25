import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  providers: [AuthService]
})
export class LoginComponentComponent implements OnInit {

  msg?: string;
  isLoading: boolean = false;

  formLoginUser!: FormGroup
  constructor(
    public authService: AuthService,
    public router: Router
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
      this.authService.signIn(this.formLoginUser.value, this.onSignInCallback)
    } else {
      console.log('Invalid input');
      this.formLoginUser.markAllAsTouched();
    }
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
