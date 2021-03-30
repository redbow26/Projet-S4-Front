import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {FormGameComponent} from './form-game/form-game.component';
import {AccueilComponent} from './accueil/accueil.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ro', component: LpSolverTestComponent},
  {path: 'register', component: InscriptionComponent}
  {path: 'form-jeux', component: FormGameComponent},
  {path: 'ro', component: LpSolverTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
