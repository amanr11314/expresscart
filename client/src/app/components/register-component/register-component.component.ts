import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { confirmPasswordValidator } from 'src/app/utils/custom_validators';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
  providers: [AuthService]
})
export class RegisterComponentComponent {
  formSignupUser!: FormGroup
  isLoading: boolean = false;
  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    this.formSignupUser = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }

  getFormValidationErrors() {

    console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

    let totalErrors = 0;

    Object.keys(this.formSignupUser!.controls).forEach(key => {
      const controlErrors: any = this?.formSignupUser?.get(key)?.errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    console.log('Number of errors: ', totalErrors);
  }

  get passowrdMatches() {
    return this.formSignupUser.get('password')?.value ===
      this.formSignupUser.get('confirm_password')?.value
  }

  onSignUpCallback = () => {
    this.isLoading = false;
  }

  signupUser() {
    if (this.formSignupUser.valid && this.passowrdMatches) {
      // console.log(this.formSignupUser.value);
      const { name, email, password } = this.formSignupUser.value;
      this.isLoading = true;
      this.authService.signUp({
        name, email, password
      }, this.onSignUpCallback)
    } else {
      console.log('Invalid input');
      console.log(this.formSignupUser.value);
      this.getFormValidationErrors();
      this.formSignupUser.markAllAsTouched();
    }
  }
}
