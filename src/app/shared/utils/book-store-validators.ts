import { FormControl, FormGroup, ValidationErrors} from '@angular/forms'
import { zip } from 'rxjs';

export class BookStoreValidators {

    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        if(control.value!==null && control.value.trim().length===0) {
            return {'notOnlyWhitespace':true};
        } else {
            return null;
        }
    }

    static passwordsNonMatching(registrationForm: FormGroup): ValidationErrors {
        let passwordValue = registrationForm.get('password')?.value;
        let confirmationValue = registrationForm.get('confirmPassword')?.value;
        if(passwordValue!==confirmationValue) {
            return {'passwordsNonMatching':true}
        }
        return null;
    }

    static nonCompletedAddress(registerForm: FormGroup) {
        let city = registerForm.get('city').value;
        let street = registerForm.get('street').value;
        let locationNumber = registerForm.get('locationNumber').value;
        let zipCode = registerForm.get('zipCode').value;
        if((!zipCode) 
            && (!locationNumber) 
            && (!street) 
            && (!city)) {
                return null;
        } else {
            if((zipCode===null || zipCode==='') 
            || (locationNumber===null || locationNumber==='') 
            || (street===null || street==='') 
            || (city===null || city==='')) {
                return {'nonCompletedAddress':true};
            } else {
                return null;
            }
        }
    }


}
