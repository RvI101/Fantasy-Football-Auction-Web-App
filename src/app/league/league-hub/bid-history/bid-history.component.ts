import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {
  @Input() leagueId: string;
  bidHistory$: Observable<any[]>;
  teams$: Observable<Map<number, string>>;
  constructor(private store: StoreService) { }

  ngOnInit() {
    this.bidHistory$ = this.store.getBidHistory(this.leagueId);
    this.teams$ = this.store.getLeagueTeamMap(this.leagueId);
  }

  // getShortHandPosition(position: string): string {
  //   if (position.includes('Back')) {
  //     return 'DEF';
  //   } else if (position.includes('Midfield')) {
  //     return 'MID';
  //   } else {
  //     return 'FWD';
  //   }
  // }

}
