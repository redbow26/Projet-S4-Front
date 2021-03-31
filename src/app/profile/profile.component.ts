import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserInfo} from '../_models/user-info';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {JeuxService} from '../_services/jeux.service';

declare var solver: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  user: UserInfo;
  detail: any;
  form: FormGroup;
  objets = [];
  jeuSelected;
  modal = false;

  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private messageService: MessageService,
              private router: Router, private authService: AuthentificationService,
              private jeuxService: JeuxService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getProfile().subscribe(
      user => {
        this.user = {...this.user, ...user};
        this.userService.getDetails(this.authService.userValue.id).subscribe(
          userDetail => {
            this.detail = {...this.detail, ...userDetail};
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'impossible d\'obtenir le detail de l\'utilisateur',
              key: 'main'
            });
            this.loading = false;
            this.router.navigateByUrl('/');
          }
        );
        this.loading = false;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'impossible d\'obtenir le profil de l\'utilisateur',
          key: 'main'
        });
        this.loading = false;
        this.router.navigateByUrl('/');
      }
    );

    this.form = new FormGroup({
      poids: new FormControl(0, [Validators.required, Validators.min(0)])
    });

  }



  onCheckChange(event, jeu): void {


    /* Selected */
    if (event.target.checked){
      // Add a new control in the arrayForm
      this.objets.push(jeu);
    }
    /* unselected */
    else{
     this.objets = this.objets.filter(item => item !== jeu);
    }
  }

  commander(): void {

    const probleme = {
      variables: {},
      ints: {},
      binaries: {},
      constraints: {
        poids: {max: this.form.get('poids').value}
      },
      opType: 'max',
      optimize: 'prix'
    };

    this.objets.forEach(jeu => {
      probleme.variables[jeu.jeu.nom] = {
        poids: jeu.jeu.poids,
        prix: jeu.prix
      };
      probleme.binaries[jeu.jeu.nom] = 1;
    });

    const resultat = solver.Solve(probleme);
    let message = '';

    for (const key in resultat) {
      if (!['bounded', 'feasible', 'isIntegral', 'result'].includes(key)) {
        message += `${key} | `;
      }
    }
    message += `result: ${resultat.result}`;

    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: message,
    });
    console.log(message);
  }

  vente(jeuId): void {
    this.jeuxService.removeAchat(jeuId)
      .subscribe(
      detail => {
          this.detail = detail;
        });
  }

  showModal(jeu): void {
    this.jeuSelected = jeu;
    this.modal = true;
  }
}
