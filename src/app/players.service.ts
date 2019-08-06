import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import playersData from './playerStore.json';
import { Player } from './models/player';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players: any = playersData.playerStore;
  playerList: Player[] = [];
  playerDict: any = {};
  teams: string[] = [];
  constructor() {
    for (const team of Object.keys(this.players)) {
      this.teams.push(team);
      this.playerList.push(...this.getPlayers(team));
    }
    this.playerList.forEach((p, i) => {
      p.id = i;
      this.playerDict[i] = p;
    });
  }

  getPlayers(team: string): Player[] {
    if (!this.players[team]) {
      return [];
    }
    return this.players[team].map((player: Player) => new Player(player, team));
  }

  public getTeams(): string[] {
    return this.teams;
  }

  getAllPlayers(): Player[] {
    return this.playerList;
  }

  getAllPlayersMap(): any {
    return this.playerDict;
  }
}
