import { Injectable } from '@angular/core';
import { map, mergeMap, groupBy, toArray, tap } from 'rxjs/operators';
import { Player } from './models/player';
import { HttpClient } from '@angular/common/http';
import { Observable, zip, of } from 'rxjs';
import { WindowService } from './services/window.service';
import { environment } from 'src/environments/environment';
import { PlayerSource } from './players.source.interface';
@Injectable({
  providedIn: 'root'
})
export class PlayerService implements PlayerSource {
  path = '/api/bootstrap-static/';
  url: string;
  apiData$: Observable<any>;
  constructor(private http: HttpClient, private windowService: WindowService) {
    if (environment.production) {
      this.url = environment.proxy + environment.fplApi;
    } else {
      // this.url = environment.proxy + environment.fplApi;
      this.url = `${this.windowService.getOrigin()}` + this.path;
    }
    this.apiData$ = http.get(this.url);
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
