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
  loading: boolean;
  mode = 0;
  modeTheme = 0;
  icon = '';
  formFilter: FormGroup;



  themes: Theme[];
  editeurs: Editeur[];

  constructor(public router: Router, public messageService: MessageService,
              public jeuxService: JeuxService, public authService: AuthentificationService) {
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
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
        this.loading = false;
      }
    );
  }

  onTriNom(): void {
    console.log('Mode : ' + this.mode);
    this.mode++;
    if (this.mode === 1) { // tri croissant par nom
      this.icon = 'pi pi-chevron-up';
      this.items = this.jeuxService.triJeuxNom(this.items, 1);
    }else {  // liste de départ
      this.mode = 0;
      this.icon = '';
      this.items = this.jeuxService.triJeuxNom(this.items);
    }
  }

  onTriTheme(): void {
    console.log('Mode : ' + this.modeTheme);
    this.modeTheme++;
    if (this.modeTheme === 1) { // tri croissant par nom
      this.icon = 'pi pi-chevron-up';
      this.items = this.jeuxService.triJeuxTheme(this.items, 1);
    }else {  // liste de départ
      this.modeTheme = 0;
      this.icon = '';
      this.items = this.jeuxService.triJeuxTheme(this.items);
    }
  }
}
