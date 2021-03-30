import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {Editeur, Jeux, Mecanique, Theme} from '../_models/jeux';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getMecaniques(): Observable<Mecanique[]> {
    return this.http.get<any>(environment.apiUrl + '/mecanics', httpOptions)
      .pipe(
        map(rep => rep.data.items),
        catchError(err => throwError(err))
      );
  }

  getEditeurs(): Observable<Editeur[]> {
    return this.http.get<any>(environment.apiUrl + '/editeurs', httpOptions)
      .pipe(
        map(rep => rep.data.items),
        catchError(err => throwError(err))
      );
  }

  getThemes(): Observable<Theme[]> {
    return this.http.get<any>(environment.apiUrl + '/themes', httpOptions)
      .pipe(
        map(rep => rep.data.items),
        catchError(err => throwError(err))
      );
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
    }, httpOptions).subscribe(rep => {
      console.log(rep);
      this.router.navigateByUrl('/');
    });
  }

  postComment(comment, id: number): void {
    this.http.post(environment.apiUrl + '/commentaires', {
      commentaire: comment.commentaire,
      note: comment.note,
      jeu_id: id
    }, httpOptions).subscribe(rep => {
      console.log(rep);
      this.router.navigateByUrl('/');
    });
  }

  getJeux(): Observable<Jeux[]> {
    return this.http.get<any>(environment.apiUrl + '/jeux', httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }

  getJeu(id: number): Observable<Jeux> {
    return this.http.get<any>(environment.apiUrl + `/jeux/${id}`, httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }

  triJeuxNom(items: Jeux[], sort?: number): Jeux[] {
    const itemsCopie = [...items];
    if (sort === undefined) {return items ; }
    if (sort > 0) {return itemsCopie.sort((x: Jeux, y: Jeux): number => x.nom > y.nom ? 1 : -1); }
  }

  triJeuxTheme(items: Jeux[], sort?: number): Jeux[] {
    const itemsCopie = [...items];
    if (sort === undefined) {return items ; }
    if (sort > 0) {return itemsCopie.sort((x: Jeux, y: Jeux): number => x.theme > y.theme ? 1 : -1); }
  }
}
