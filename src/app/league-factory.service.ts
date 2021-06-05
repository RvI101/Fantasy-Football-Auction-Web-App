import { Injectable } from '@angular/core';
import { League } from './models/league';
import { Observable, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PlayerSource } from './players.source.interface';
import { PlayersFileSource } from './services/players.file.source';

@Injectable({
  providedIn: 'root'
})
export class LeagueFactoryService {

  constructor(private playerService: PlayersFileSource) {}

  public getNewLeague(): Observable<League> {
    return zip(this.playerService.getTeamMap(), this.playerService.getAllPlayersMap())
      .pipe(
        map(([tm, pm]: [Map<number, string>, any]) => {
          const newLeague = new League();
          newLeague.players = pm;
          newLeague.teamMap = Object.fromEntries([...tm]);
          return newLeague;
        })
        // tap((l: League) => console.log(l))
      );
  }
}
