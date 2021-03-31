import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserInfo} from '../_models/user-info';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  user: UserInfo;
  detail: any;

  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private messageService: MessageService, private router: Router, private authService: AuthentificationService) {
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
  }
}
