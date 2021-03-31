import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {customValidators} from '../custom-validators';
import {JeuxService} from "../_services/jeux.service";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  @Input() id: number;
  @Output() validate = new EventEmitter();

  form: any = {
    dateBuy: null,
    location: null,
    price: null,
  };

  formPurchase = new FormGroup({
    dateBuy: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(private jeuxService: JeuxService) { }

  ngOnInit(): void {
  }

  get dateBuy(): AbstractControl {
    return this.formPurchase.get('dateBuy');
  }
  get location(): AbstractControl {
    return this.formPurchase.get('location');
  }
  get price(): AbstractControl {
    return this.formPurchase.get('price');
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formPurchase.value};
    this.jeuxService.ajouteAchat(this.form.location, this.form.dateBuy, this.form.price, this.id);
    this.validate.emit(false);
  }

}
