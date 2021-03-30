import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Jeux} from '../_models/jeux';
import {JeuxService} from '../_services/jeux.service';

@Component({
  selector: 'app-form-game',
  templateUrl: './form-game.component.html',
  styleUrls: ['./form-game.component.css']
})
export class FormGameComponent implements OnInit {

  form: FormGroup;

  constructor(public jeuxService: JeuxService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      description: new FormControl('', Validators.required),
      theme: new FormControl('', Validators.required),
      editeur: new FormControl('', Validators.required),
      mecanique: new FormControl('', Validators.required),
      url_media: new FormControl(''),
      categorie: new FormControl('', Validators.required),
      regle: new FormControl('', Validators.required),
      langue: new FormControl('', Validators.required),
      nombre_joueur: new FormControl(2, [Validators.required, Validators.min(2), Validators.max(8)]),
      age: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(16)]),
      poids: new FormControl(0.1, [Validators.required, Validators.min(0.1), Validators.max(5.00)]),
      duree: new FormControl(0, Validators.required)
    });
  }

  sendForm(): void {
    if (this.form.invalid) { return; }
    const jeu: Jeux = {
      nom: this.form.get('nom'),
      description: this.form.get('description'),
      regles: this.form.get('regles'),
      url_media: this.form.get('url_media'),
      theme: this.form.get('theme'),
      editeur: this.form.get('editeur'),
      duree: this.form.get('duree'),
      langue: this.form.get('langue'),
      nombre_joueur: this.form.get('nombre_joueur'),
      poids: this.form.get('poids'),
      age: this.form.get('age'),
      categorie: this.form.get('categorie'),
      mecanique: this.form.get('mecanique'),
    };
    this.jeuxService.postJeu(jeu);
  }
}
