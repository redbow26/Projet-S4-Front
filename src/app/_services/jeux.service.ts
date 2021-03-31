import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {Editeur, Jeux, Mecanique, Theme} from '../_models/jeux';
import {Router} from '@angular/router';
import {AuthentificationService} from './authentification.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthentificationService) {
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
      this.router.navigateByUrl(`/jeux/${id}`);
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

  getJeuxTrie(sort: string): Observable<Jeux[]> {
    let url = environment.apiUrl + `/jeux`;
    if (sort === 'nom' || sort === 'note') {
      url += `?sort=${sort}`;
    }
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(rep => {
          return rep.data.item;
        }),
        catchError(err => throwError(err))
      );
  }

  getJeuxFiltre(theme?: number, editeur?: number, age?: number, nbJoueurs?: number): Observable<Jeux[]> {
    const params = new HttpParams();

    if (theme && theme !== 0) {
      params.set('theme', `${theme}`);
    }
    if (editeur && editeur !== 0) {
      params.set('editeur', `${editeur}`);
    }
    if (age && age !== 0) {
      params.set('age', `${age}`);
    }
    if (nbJoueurs && nbJoueurs !== 0) {
      params.set('nbJoueurs', `${nbJoueurs}`);
    }

    return this.http.get<any>(environment.apiUrl + `/jeux`, {...httpOptions, params} )
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }


  ajouteAchat(lieu: string, date_achat: string, prix: number, jeu_id: number): void{
    const id = this.authService.userValue.id;
    console.log('location', lieu, ' dateBuy', date_achat, ' price', prix, ' id', jeu_id);
    this.http.post<any>(`${environment.apiUrl}/users/${id}/achat`, {lieu, date_achat, prix, jeu_id}, httpOptions).subscribe(console.log);
  }
}
