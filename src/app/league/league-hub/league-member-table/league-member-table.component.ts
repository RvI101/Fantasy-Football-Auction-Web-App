import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { League } from 'src/app/models/league';
import { Observable } from 'rxjs';
import { PlayerService } from 'src/app/players.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-league-member-table',
  templateUrl: './league-member-table.component.html',
  styleUrls: ['./league-member-table.component.css']
})
export class LeagueMemberTableComponent implements OnInit, OnChanges {
  @Input() league: League;
  @Input() leagueMembers$: Observable<any[]>;
  teamMap$: Observable<Map<number, string>>;
  constructor(private fplApi: PlayerService, private afAuth: AngularFireAuth) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.memberEntries);
  }

  ngOnInit(): void {
    // console.log(this.memberEntries);
    this.teamMap$ = this.fplApi.getTeamMap();
  }

  capitalizeWord(word: string): string {
    return word.charAt(0).toUpperCase() + word.substr(1);
  }

  isCurrentUserId(uid: string): Observable<boolean> {
    return this.afAuth.user
      .pipe(
        take(1),
        map((u: User) => u.uid === uid)
      );
  }
}
