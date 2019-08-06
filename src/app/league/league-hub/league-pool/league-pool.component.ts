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
  selectedTeam: string;
  players$: Observable<Player>;
  teams: string[];
  leagueId: string;

  constructor(private store: StoreService, private route: ActivatedRoute, private fileStore: PlayerService) {}

  ngOnInit() {
    this.teams = this.fileStore.getTeams();
    this.leagueId = this.route.snapshot.paramMap.get('id');
    console.log(this.leagueId);
    this.players$ = this.store.getPlayers(this.leagueId);
  }

  onSelect(team: string): void {
    this.selectedTeam = team;
  }

}
