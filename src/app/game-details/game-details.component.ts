import {Component, Input, OnInit} from '@angular/core';
import {Jeux} from '../_models/jeux';
import {JeuxService} from '../_services/jeux.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  jeu: Jeux;
  modal = false;
  id: number;

  constructor(public route: ActivatedRoute, public messageService: MessageService,
              public jeuxService: JeuxService, public authService: AuthentificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      this.jeuxService.getJeu(this.id).subscribe(
        jeu => {
          this.jeu = jeu;
          console.log(jeu);
        },
        (err) => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: `impossible d'obtenir le jeu ${this.id}` , key: 'main'});
        }
      );
    });
  }

}
