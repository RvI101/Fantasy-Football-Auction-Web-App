import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../players.service';
import { Player } from '../player';
@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[];
  teams: string[];
  selectedTeam: string;
  constructor(private playersService: PlayerService) {}

  ngOnInit() {
    this.getTeams();
    // this.getPlayers();
  }

  // getPlayers(): void {
  //   this.players = this.playersService.getPlayers();
  // }

  getTeams(): void {
    this.teams = this.playersService.getTeams();
  }

  onSelect(team: string): void {
    this.selectedTeam = team;
  }
}
