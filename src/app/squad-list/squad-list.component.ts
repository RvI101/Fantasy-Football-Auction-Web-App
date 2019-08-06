import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Player } from '../models/player';
import { PlayerService } from '../players.service';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: ['./squad-list.component.css']
})
export class SquadListComponent implements OnInit, OnChanges {
  @Input() selectedTeam: string;
  players: Player[];
  constructor(private playersService: PlayerService) { }

  ngOnInit() {}
  ngOnChanges() {
    this.getPlayers();
  }
  getPlayers(): void {
    this.players = this.playersService.getPlayers(this.selectedTeam);
  }

}
