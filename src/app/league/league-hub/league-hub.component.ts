import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StoreService } from 'src/app/store.service';
import { switchMap, map, takeUntil, tap, mergeAll, every, take } from 'rxjs/operators';
import { League } from 'src/app/models/league';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

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
    this.route.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((params: ParamMap) => this.store.getUserStatus(params.get('id')))
    ).subscribe(status => {
      this.canBid = status === 'bid';
      this.status = status;
    });

    this.league$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.store.getLeague(params.get('id'))),
      map(league => {
        league.members = [...Object.values(league.members)];
        return league;
      })
    );

    const ul$ = this.league$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(l => {this.isAdmin = l.admin === this.afAuth.auth.currentUser.uid; }),
        switchMap(l => l.members.map(m => this.store.getUserLeagueDetails(l.leagueId, m))),
        mergeAll()
      );

    ul$.subscribe(ul => {
      this.memberMap[ul.uid] = {status: ul.status, squadSize: ul.squadSize};
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
