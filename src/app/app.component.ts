import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MenuItem, MessageService} from 'primeng/api';
import {AuthentificationService} from './_services/authentification.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items$: Observable<MenuItem[]>;
  title = 'ludotheque-client';

  constructor(public messageService: MessageService, public authService: AuthentificationService) {
  }


  ngOnInit(): void {
    this.items$ = this.authService.isLoggedIn$.pipe(
      map(isLoggedIn => this.getMenuItems(isLoggedIn)),
      startWith(this.getMenuItems(false))
    );
  }

  show(): void {
    const now = moment().format('LL');
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${this.title}, ${now}`,
    });
  }

  logout(): void {
    this.authService.logout();
  }

  private getMenuItems(isLoggedIn: boolean): MenuItem[] {
    const item: MenuItem[] = [];
    item.push({ label: 'Médusathèque', routerLink: [''] });
    if (isLoggedIn) {
      item.push({ label: 'Profile',  routerLink: '/profile' });
      item.push({ label: 'Ajouter jeux',  routerLink: '/form-jeux' });
      item.push({ label: 'Logout',  command: (onClick) => this.logout(), routerLink: '' });
    } else {
      item.push({ label: 'Login',  routerLink: '/login'});
      item.push({ label: 'Register',  routerLink: '/register'});
    }
    item.push({ label: 'RO',  routerLink: '/ro'});
    return item;
  }

}
