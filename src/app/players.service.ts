import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import playersData from './playerStore.json';
import { Player } from './models/player';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  allUrl = 'https://fantasy.premierleague.com/api/bootstrap-static/';
  players: any = playersData.playerStore;
  playerList: Player[] = [];
  playerDict: any = {};
  teams: string[] = [];
  constructor(private http: HttpClient) {
    http.get(this.allUrl)
      .subscribe(data => {
        this.teams = data['teams'];
        this.playerList = data['elements'];
        this.playerList.forEach(p => {
          this.playerDict[p['id']] = new Player(p);
        });
      });
  }

  getPlayers(team: string): Player[] {
    if (!this.players[team]) {
      return [];
    }
    return this.players[team].map((player: Player) => new Player(player));
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
