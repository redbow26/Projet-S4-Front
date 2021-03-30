import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JeuxService} from '../_services/jeux.service';
import {Editeur, Mecanique, Theme} from '../_models/jeux';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-form-game',
  templateUrl: './form-game.component.html',
  styleUrls: ['./form-game.component.css']
})
export class FormGameComponent implements OnInit {

  form: FormGroup;
  themes: Theme[];
  mecaniques: Mecanique[];
  editeurs: Editeur[];

  constructor(private messageService: MessageService, public jeuxService: JeuxService) {
  }

  ngOnInit(): void {
    this.jeuxService.getThemes().subscribe(
      themes => {
        this.themes = themes;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
      }
    );
    this.jeuxService.getEditeurs().subscribe(
      editeurs => {
        this.editeurs = editeurs;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
      }
    );
    this.jeuxService.getMecaniques().subscribe(
      mecaniques => {
        this.mecaniques = mecaniques;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
      }
    );

    console.log(this.themes);
    console.log(this.editeurs);
    console.log(this.mecaniques);

    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      description: new FormControl('', Validators.required),
      theme: new FormControl(1, Validators.required),
      editeur: new FormControl(1, Validators.required),
      mecanique: new FormControl(1, Validators.required),
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
    this.jeuxService.postJeu(this.form.value);
  }
}
