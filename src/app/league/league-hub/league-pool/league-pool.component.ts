import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/players.service';

@Component({
  selector: 'app-league-pool',
  templateUrl: './league-pool.component.html',
  styleUrls: ['./league-pool.component.css']
})
export class LeaguePoolComponent implements OnInit {
  selectedTeam: any;
  players$: Observable<Player>;
  teams$: Observable<Map<number, string>>;
  leagueId: string;

  constructor(private store: StoreService, private route: ActivatedRoute, private fileStore: PlayerService) {}

  ngOnInit() {
    this.leagueId = this.route.snapshot.paramMap.get('id');
    this.teams$ = this.store.getLeagueTeamMap(this.leagueId);
    this.players$ = this.store.getPlayers(this.leagueId);
  }

  onSelect(tId: number, tName: string): void {
    this.selectedTeam = {id: tId, name: tName};
  }

}
