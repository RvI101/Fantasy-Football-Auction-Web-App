import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import playersData from './playerStore.json';
import { Player } from './models/player';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  allUrl = 'http://localhost:4200/api/bootstrap-static/';
  players: any = playersData.playerStore;
  playerList: Player[] = [];
  playerDict: any = {};
  teams: string[] = [];
  teamMap: any = {};
  constructor(private http: HttpClient) {
    http.get(this.allUrl)
      .subscribe((data: any) => {
        // this.teams = data['teams'].map(obj => obj.name);
        this.teamMap = Object.assign({}, ...data.teams.map((tObj) => ({[tObj.id]: tObj.name})));
        console.log(this.teamMap);
        // console.log(this.teams);
        this.playerList = data.elements;
        this.playerList.forEach((p: any) => {
          this.playerDict[p.id] = new Player(p);
        });
      });
  }

  getPlayers(team: string): Player[] {
    console.log(`GET players of team ${team} : ${this.players[team]}`)
    if (!this.players[team]) {
      return [];
    }
    return this.players[team].map((player: Player) => new Player(player));
  }

  public getTeams(): string[] {
    return Object.values(this.teamMap);
  }

  public getTeamMap(): any {
    return this.teamMap;
  }

  getAllPlayers(): Player[] {
    return this.playerList;
  }

  getAllPlayersMap(): any {
    return this.playerDict;
  }

  getTeamId(teamName: string): number {
    return this.teamMap.teamName;
  }
}
