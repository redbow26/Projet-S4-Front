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

  trie(critere: string): void {
    this.jeuxService.getJeuxTrie(critere).subscribe(
      jeux => {
        this.items = jeux;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir la liste des jeux' , key: 'main'});
        this.loading = false;
      }
    );

  }

}
