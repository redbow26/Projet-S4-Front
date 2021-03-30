import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
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

  getJeux(): Observable<Jeux[]> {
    return this.http.get<any>(environment.apiUrl + '/jeux', httpOptions)
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
