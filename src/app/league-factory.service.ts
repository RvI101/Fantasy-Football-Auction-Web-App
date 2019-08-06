import { Injectable } from '@angular/core';
import { PlayerService } from './players.service';
import { League } from './models/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueFactoryService {

  constructor(private playerService: PlayerService) {}

  public getNewLeague(): League {
    const newLeague = new League();
    newLeague.players = this.playerService.getAllPlayersMap();
    return newLeague;
  }
}
