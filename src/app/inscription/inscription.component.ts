import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../_services/authentification.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {customValidators} from '../custom-validators';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  form: any = {
    firstname: null,
    name: null,
    nickname: null,
    email: null,
    pwd: null,
    confirmPwd: null,
  };
  loading = false;
  returnUrl: string;
  error = '';

  formulaire = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    nickname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormGroup({
      pwd: new FormControl('', [Validators.required, Validators.minLength(8), customValidators.hasUpper, customValidators.hasNumber]),
      confirmPwd: new FormControl('')
    }, [customValidators.passwordConfirming])
  });

  constructor(private authService: AuthentificationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  get firstname(): AbstractControl {
    return this.formulaire.get('firstname');
  }
  get name(): AbstractControl {
    return this.formulaire.get('name');
  }
  get nickname(): AbstractControl {
    return this.formulaire.get('nickname');
  }
  get email(): AbstractControl {
    return this.formulaire.get('email');
  }
  get pwd(): AbstractControl {
    return this.formulaire.get('password').get('pwd');
  }
  get confirmPwd(): AbstractControl {
    return this.formulaire.get('password').get('confirmPwd');
  }
  get password(): AbstractControl {
    return this.formulaire.get('password');
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};
    this.authService.register(this.form.firstname, this.form.name, this.form.nickname, this.form.email, this.form.password.pwd);
    this.router.navigate(['/login']);
  }

}
