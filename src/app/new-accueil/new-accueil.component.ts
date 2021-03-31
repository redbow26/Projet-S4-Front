import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-accueil',
  templateUrl: './new-accueil.component.html',
  styleUrls: ['./new-accueil.component.css']
})
export class NewAccueilComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectListeJeux(): void {
    this.router.navigate(['/liste-jeux']);
  }

}
