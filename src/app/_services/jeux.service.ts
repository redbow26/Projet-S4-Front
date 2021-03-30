import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {UserInfo} from '../_models/user-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {Jeux} from '../_models/jeux';
import {catchError, map} from 'rxjs/operators';
import {Jeux} from '../_models/jeux';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http: HttpClient) {
  }

  postJeu(jeux: Jeux): void {
    this.http.post(environment.apiUrl + '/jeux', {
      nom: jeux.nom,
      description: jeux.description,
      theme: jeux.theme,
      editeur: jeux.editeur,
      url_media: jeux.url_media,
      langue: jeux.langue,
      age: jeux.age,
      poids: jeux.poids,
      nombre_joueurs: jeux.nombre_joueur,
      duree: jeux.duree,
      categories: jeux.categorie,
      mecanique: jeux.mecanique
    }, httpOptions).pipe(
        tap(rep => console.log(rep)),
        shareReplay(),
        catchError(err => {
          return throwError(err);
          // return of('');
        }));

  getJeux(): Observable<Jeux[]> {
    return this.http.get<any>(environment.apiUrl + '/jeux', httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }
}
