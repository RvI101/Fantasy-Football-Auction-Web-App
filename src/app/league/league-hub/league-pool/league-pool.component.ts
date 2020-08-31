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
  selectedTeam: number;
  players$: Observable<Player>;
  teams: any;
  leagueId: string;

  constructor(private store: StoreService, private route: ActivatedRoute, private fileStore: PlayerService) {}

  ngOnInit() {
    this.teams = this.fileStore.getTeamMap();
    this.leagueId = this.route.snapshot.paramMap.get('id');
    this.players$ = this.store.getPlayers(this.leagueId);
  }

  getTeamKeys(): string[] {
    return Object.keys(this.teams);
  }
  onSelect(team: string): void {
    this.selectedTeam = Number(team) || 0;
  }

}
