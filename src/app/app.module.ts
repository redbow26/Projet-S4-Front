import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthentificationService} from './_services/authentification.service';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {registerLocaleData} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptorService} from './_services/jwt-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from './_services/user.service';
import { LpSolverTestComponent } from './lp-solver-test/lp-solver-test.component';
import {MarkdownModule} from 'ngx-markdown';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormGameComponent } from './form-game/form-game.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameAddCommentModalComponent } from './game-add-comment-modal/game-add-comment-modal.component';
import { PurchaseComponent } from './purchase/purchase.component';
import {TableModule} from 'primeng/table';
import { NewAccueilComponent } from './new-accueil/new-accueil.component';
import {PaginatorModule} from 'primeng/paginator';
import { GameModalComponent } from './game-modal/game-modal.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LpSolverTestComponent,
    InscriptionComponent,
    LpSolverTestComponent,
    FormGameComponent,
    LpSolverTestComponent,
    AccueilComponent,
    GameDetailsComponent,
    GameAddCommentModalComponent,
    PurchaseComponent,
    NewAccueilComponent,
    GameModalComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot(),
        AppRoutingModule,
        MomentModule,
        MessagesModule,
        ToastModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        TabMenuModule,
        CardModule,
        ButtonModule,
        DialogModule,
        TableModule,
        PaginatorModule,
    ],
  providers: [AuthentificationService, MessageService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
