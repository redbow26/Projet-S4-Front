import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {JeuxService} from '../_services/jeux.service';
import {Editeur, Jeux, Mecanique, Theme} from '../_models/jeux';
import {Router} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  items: Jeux[];
  jeux: Jeux[];

  loading: boolean;
  formFilter: FormGroup;
  themes: Theme[];
  editeurs: Editeur[];

  constructor(public router: Router, public messageService: MessageService,
              public jeuxService: JeuxService) {
    this.loading = false;
    this.items = [];
  }

  ngOnInit(): void {

    this.jeuxService.getThemes().subscribe(
      themes => {
        this.themes = themes;
        this.themes.unshift({id: 0, nom: 'Filtrer sur un themes'});
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des themes' , key: 'main'});
      }
    );
    this.jeuxService.getEditeurs().subscribe(
      editeurs => {
        this.editeurs = editeurs;
        this.editeurs.unshift({id: 0, nom: 'Filtrer sur un editeur'});
      },
      (err) => {
        // tslint:disable-next-line:max-line-length
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des editeurs' , key: 'main'});
      }
    );

    this.loading = false;
    this.jeuxService.getJeux().subscribe(
      jeux => {
        this.items = jeux;
        this.setJeux();
        this.loading = false;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
        this.loading = false;
      }
    );

    this.formFilter = new FormGroup({
      theme: new FormControl(0),
      editeur: new FormControl(0),
      nombre_joueur: new FormControl(null, [Validators.min(2), Validators.max(8)]),
      age: new FormControl(null, [Validators.min(1), Validators.max(16)]),
    });
  }

  filter(): void {
    // tslint:disable-next-line:max-line-length
    this.jeuxService.getJeuxFiltre( this.formFilter.get('theme').value, this.formFilter.get('editeur').value, this.formFilter.get('age').value, this.formFilter.get('nombre_joueur').value).subscribe(
      jeux => {
        this.items = jeux;
        this.setJeux();
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
        this.loading = false;
      }
    );
  }

  trie(critere: string): void {
    this.jeuxService.getJeuxTrie(critere).subscribe(
      jeux => {
        this.items = jeux;
        this.setJeux();
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
        this.loading = false;
      }
    );
  }

  setJeux(first: number = 0, rows: number = 5): void {
    this.jeux = this.items.slice(first, first + rows);
    console.log(this.jeux);
  }

  paginate(event): void {
    this.setJeux(event.first, event.rows);
  }

}
