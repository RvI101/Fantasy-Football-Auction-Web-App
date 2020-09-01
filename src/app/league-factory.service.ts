import { Injectable } from '@angular/core';
import { PlayerService } from './players.service';
import { League } from './models/league';
import { Observable } from 'rxjs';
import { Player } from './models/player';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueFactoryService {

  constructor(private playerService: PlayerService) {}

  public getNewLeague(): Observable<League> {
    return this.playerService.getAllPlayersMap()
      .pipe(
        map((pm: any) => {
          const newLeague = new League();
          newLeague.players = pm;
          return newLeague;
        })
        // tap((l: League) => console.log(l))
      );
  }
}
