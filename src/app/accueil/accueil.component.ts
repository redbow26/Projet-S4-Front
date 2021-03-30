import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {JeuxService} from '../_services/jeux.service';
import {Jeux} from '../_models/jeux';
import {Router} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';

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
  modalDetail = false;
  modalForm = false;
  selectedId: number;

  constructor(public router: Router, public messageService: MessageService,
              public jeuxService: JeuxService, public authService: AuthentificationService) {
    this.loading = false;
    this.items = [];
  }

  ngOnInit(): void {
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

  voirDetail(id: number): void {
    this.selectedId = id;
    this.modalDetail = true;
  }

  voirForm(id: number): void {
    this.selectedId = id;
    this.modalForm = true;
  }
}
