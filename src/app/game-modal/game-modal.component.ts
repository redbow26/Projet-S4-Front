import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.css']
})
export class GameModalComponent implements OnInit {
  @Input() jeu;

  constructor() { }

  ngOnInit(): void {
  }

}
