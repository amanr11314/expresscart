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

  loginUser() {
    if (this.formLoginUser.valid) {
      this.authService.signIn(this.formLoginUser.value)
    } else {
      console.log('Invalid input');
      this.formLoginUser.markAllAsTouched();
    }
  }

}
