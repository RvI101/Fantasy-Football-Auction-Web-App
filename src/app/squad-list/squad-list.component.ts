import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Player } from '../models/player';
import { PlayerService } from '../players.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: ['./squad-list.component.css']
})
export class SquadListComponent implements OnInit {
  @Input() selectedTeam: any;
  @Input() players$: Observable<Map<number, Player[]>>;
  players: Player[];
  constructor(private playersService: PlayerService) { }

  ngOnInit() {
    console.log(this.selectedTeam);
  }

}
