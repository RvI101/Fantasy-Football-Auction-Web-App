import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { League } from 'src/app/models/league';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { take, map, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-league-member-table',
  templateUrl: './league-member-table.component.html',
  styleUrls: ['./league-member-table.component.css']
})
export class LeagueMemberTableComponent implements OnInit {
  @Input() league: League;
  @Input() leagueMembers$: Observable<any[]>;
  teamMap$: Observable<Map<number, string>>;
  userId$: Observable<string>;
  constructor(private store: StoreService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    // console.log(this.memberEntries);
    this.teamMap$ = this.store.getLeagueTeamMap(this.league.leagueId);
    this.userId$ = this.getCurrentUserId();
  }

  capitalizeWord(word: string): string {
    return word.charAt(0).toUpperCase() + word.substr(1);
  }

  getCurrentUserId(): Observable<string> {
    return this.afAuth.user
      .pipe(
        // take(1),
        map((u: User) => u.uid),
        tap(v => console.log(v))
      );
  }
}
