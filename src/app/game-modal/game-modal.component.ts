import {Component, Input, OnInit} from '@angular/core';
import {Jeux} from '../_models/jeux';
import {JeuxService} from '../_services/jeux.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.css']
})
export class GameModalComponent implements OnInit {
  @Input() id: number;
  jeu: Jeux;

  constructor(public messageService: MessageService, public jeuxService: JeuxService) { }

  ngOnInit(): void {
    this.jeuxService.getJeu(this.id).subscribe(
      jeu => {
        this.jeu = jeu;
        console.log(jeu);
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: `impossible d'obtenir le jeu ${this.id}` , key: 'main'});
      }
    );
  }

}
