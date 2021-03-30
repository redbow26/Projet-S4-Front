import {AbstractControl} from "@angular/forms";
import { FormControl } from '@angular/forms';

export class customValidators {
  static passwordConfirming(c: AbstractControl): {[s: string]: boolean} {
    if(c.get('pwd').value !== c.get('confirmPwd').value) {
      return {invalid: true};
    }
    return null;
  }

  static hasUpper(c: FormControl): {[s: string]: boolean} {
    if (!(/[A-Z]/.test(c.value))){
      return {invalid: true};
    }
    return null;
  }

  static hasNumber(c: FormControl): {[s: string]: boolean} {
    if (!(/\d/.test(c.value))){
      return {invalid: true};
    }
    return null;
  }

}
