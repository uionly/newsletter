import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let password2 = AC.get('password2').value; // to get value in input tag
        if(password != password2) {
            console.log('false');
            AC.get('password2').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}