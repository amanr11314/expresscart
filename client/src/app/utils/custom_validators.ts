import { AbstractControl, ValidationErrors, ValidatorFn, FormControl, FormGroup } from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? { passwordStrength: true } : null;
    }
}

export function noWhitespaceMinLengthValidator(minContentLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value

        if (!value) {
            return null;
        }

        // check is has minContentLength with trimmed spaces
        const isValid = value.trim().length >= minContentLength;

        return !isValid ? { noWhitespaceMinLength: true } : null;
    }
}

export function confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        return control.value.password === control.value.confirm_password ? null : { PasswordNoMatch: true }
    }
}

// export function getFormErrors(form: AbstractControl) {
//     if (form instanceof FormControl) {
//         // Return FormControl errors or null
//         return form.errors ?? null;
//     }
//     if (form instanceof FormGroup) {
//         const groupErrors = form.errors;
//         // Form group can contain errors itself, in that case add'em
//         const formErrors = groupErrors ? { groupErrors } : {};
//         Object.keys(form.controls).forEach(key => {
//             // Recursive call of the FormGroup fields
//             const error = getFormErrors(form.get(key));
//             if (error !== null) {
//                 // Only add error if not null
//                 formErrors[key] = error;
//             }
//         });
//         // Return FormGroup errors or null
//         return Object.keys(formErrors).length > 0 ? formErrors : null;
//     }
// }
