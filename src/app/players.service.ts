import { Injectable } from '@angular/core';
import { map, mergeMap, groupBy, toArray, tap } from 'rxjs/operators';
import playersData from './playerStore.json';
import { Player } from './models/player';
import { HttpClient } from '@angular/common/http';
import { Observable, zip, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  allUrl = 'http://localhost:4200/api/bootstrap-static/';
  apiData$: Observable<any>;
  constructor(private http: HttpClient) {
    this.apiData$ = http.get(this.allUrl);
  }

  public getTeamMap(): Observable<Map<number, string>> {
    return this.apiData$
      .pipe(
        map((data: any) => new Map<number, string>(data.teams.map((tObj: any) => [Number(tObj.id), tObj.name]))),
        tap(m => console.log(m))
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
