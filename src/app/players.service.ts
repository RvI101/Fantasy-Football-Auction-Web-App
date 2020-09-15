import { Injectable, Inject } from '@angular/core';
import { map, mergeMap, groupBy, toArray, tap } from 'rxjs/operators';
import playersData from './playerStore.json';
import { Player } from './models/player';
import { HttpClient } from '@angular/common/http';
import { Observable, zip, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  path = '/api/bootstrap-static/';
  url: string;
  apiData$: Observable<any>;
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    if (environment.production) {
      this.url = environment.proxy + environment.fplApi;
    } else {
      // this.url = environment.proxy + environment.fplApi;
      this.url = `${this.document.location.protocol}//${this.document.location.hostname}:${this.document.location.port}`
       + this.path;
    }
    this.apiData$ = this.http.get(this.url);
    console.log(this.url);
  }

  public getTeamMap(): Observable<Map<number, string>> {
    return this.apiData$
      .pipe(
        map((data: any) => new Map<number, string>(data.teams.map((tObj: any) => [Number(tObj.id), tObj.name]))),
        // tap(m => console.log(m))
      );
  }

  getAllPlayersByTeam(): Observable<Map<number, Player[]>> {
    return this.apiData$
      .pipe(
        mergeMap((data: any) => data.elements.map((pObj: any) => new Player(pObj))),
        groupBy(
          (player: Player) => player.team,
          p => p
        ),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        toArray(),
        map(finalObj => new Map<number, Player[]>(finalObj))
      );
  }

  getAllPlayersMap(): Observable<any> {
    return this.apiData$
      .pipe(
        map((data: any) =>
          Object.assign({}, ...data.elements.map((pObj: any) => ({[pObj.id]: new Player(pObj)}))))
        // tap(p => console.log(p))
      );
  }
}
