import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StoreService } from 'src/app/store.service';
import { switchMap, map, takeUntil, tap, mergeAll, every, take } from 'rxjs/operators';
import { League } from 'src/app/models/league';
import { Observable, Subject, zip } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-league-hub',
  templateUrl: './league-hub.component.html',
  styleUrls: ['./league-hub.component.css']
})
export class LeagueHubComponent implements OnInit, OnDestroy {
  leagueId$: string;
  unsubscribe$ = new Subject();
  league$: Observable<League>;
  league: League;
  canBid = false;
  isOpen = true;
  status: string;
  isAdmin = false;
  allWait = false;
  memberMap = {};
  money$: Observable<number>;
  projectedMoney: number;
  squadSize$: Observable<number>;
  constructor(private router: Router, private store: StoreService, private route: ActivatedRoute, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // console.log(this.memberMap);
    this.route.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((params: ParamMap) => this.store.getUserStatus(params.get('id')))
    ).subscribe(status => {
      this.canBid = status === 'bid';
      this.status = status;
    });

    this.league$ = this.route.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((params: ParamMap) => this.store.getLeague(params.get('id'))),
      map(league => {
        league.members = [...Object.values(league.members)];
        return league;
      })
    );

    const ul$ = zip(this.league$, this.afAuth.user.pipe(map((u: User) => u.uid)))
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(([l, uid]: [League, string]) => {this.isAdmin = l.admin === uid; }),
        switchMap(([l, uid]: [League, string]) => l.members.map(m => this.store.getUserLeagueDetails(l.leagueId, m))),
        mergeAll()
      );

    const memberNames$ = this.league$
        .pipe(
          takeUntil(this.unsubscribe$),
          switchMap(l => l.members.map(m => this.store.getUserDisplayName(m).pipe(take(1)))),
          mergeAll()
          // tap(n => console.log(`Member Name : ${n}`))
        );

    // TODO: replace selector lambda arg with map()
    const leagueMembers$ = zip(
      ul$,
      memberNames$,
      (ul: any, memberName: string) =>
        ({uid: ul.uid, status: ul.status, squadSize: ul.squadSize, displayName: memberName})
    );

    leagueMembers$.subscribe(ul => {
      this.memberMap[ul.uid] = ul;
      // console.log(ul);
      const validStatuses = ([...Object.values(this.memberMap)] as any[]).filter(ms => ms.status !== 'done');
      this.allWait = validStatuses.length && validStatuses.every(ms => ms.status === 'wait');
    });

    this.league$
      .subscribe(l => {
        this.updateState(l.leagueId);
        this.money$ = this.store.getUserMoney(l.leagueId);
        this.squadSize$ = this.store.getSquadSize(l.leagueId);
      });
  }

  resolveBids(leagueId: string): void {
    this.store.resolveBids(leagueId);
  }

  updateState(leagueId: string): void {
    this.store.updateUserLeagueState(leagueId);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
