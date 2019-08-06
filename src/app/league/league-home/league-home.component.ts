import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-league-home',
  templateUrl: './league-home.component.html',
  styleUrls: ['./league-home.component.css']
})
export class LeagueHomeComponent implements OnInit {
  adminLeagues: Observable<any>;
  memberLeagues: Observable<any>;
  constructor(private afAuth: AngularFireAuth, private leagueService: StoreService) {
    this.adminLeagues = leagueService.getAdminLeagues();
    this.memberLeagues = leagueService.getMemberLeagues();
  }

  ngOnInit() {
  }
  deleteLeague(league: any): void {
    this.leagueService.deleteLeague(league.leagueId);
  }
}
