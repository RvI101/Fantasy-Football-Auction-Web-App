import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../players.service';
import { Player } from '../player';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players$: Observable<Map<number, Player[]>>;
  teams$: Observable<Map<number, string>>;
  selectedTeam: any;
  constructor(private playersService: PlayerService) {}

  ngOnInit() {
    this.teams$ = this.playersService.getTeamMap();
    this.players$ = this.playersService.getAllPlayersByTeam();
  }

  onSelect(tId: number, tName: string): void {
    this.selectedTeam = {id: tId, name: tName};
  }
}
