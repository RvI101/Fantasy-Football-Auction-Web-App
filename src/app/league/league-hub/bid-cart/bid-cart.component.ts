import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import { distinct, takeUntil, count, map, reduce, mergeMap, tap, first} from 'rxjs/operators';

@Component({
  selector: 'app-bid-cart',
  templateUrl: './bid-cart.component.html',
  styleUrls: ['./bid-cart.component.css']
})
export class BidCartComponent implements OnInit, OnDestroy {
  @Input() leagueKey: string;
  private unsubscribe$ = new Subject();
  tentativeBids: Observable<any[]>;
  hasDuplicate: boolean;
  isComplete: boolean;
  squadSpace$: Observable<number>;
  squadSpace = 15;
  bidNumber = 0;
  balance$: Observable<number>;
  balance: number;
  teamMap: Map<number, string>;
  constructor(private store: StoreService) { }

  async ngOnInit() {
    // console.log(this.leagueKey);
    this.isComplete = false;
    this.hasDuplicate = false;
    this.tentativeBids = this.store.getTentativeBids(this.leagueKey);
    this.squadSpace$ = this.store.getSquadSize(this.leagueKey)
      .pipe(takeUntil(this.unsubscribe$), map(s => 15 - s));

    this.squadSpace$.subscribe(s => this.squadSpace = s);
    this.tentativeBids.pipe(takeUntil(this.unsubscribe$)).subscribe(bids => {
      const dict = {};
      this.bidNumber = bids.length;
      this.hasDuplicate = bids.some((b, i) => {
        if (!(b.name in dict)) {
          dict[b.name] = 1;
        } else {
          return true;
        }
      });
    });

    this.balance$ = combineLatest([this.store.getTentativeBids(this.leagueKey)
      .pipe(
        map(val => val.reduce((sum, curr) => sum + curr.amount, 0))
        ),
      this.store.getUserMoney(this.leagueKey)])
        .pipe(
          map(arr => arr[1] - arr[0])
        );

    this.balance$.subscribe(b => this.balance = b);

    combineLatest([this.store.getTentativeBids(this.leagueKey).pipe(map(b => b.length)), this.squadSpace$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(c => {
        this.isComplete = (c[0] === c[1]);
      });

    this.teamMap = await this.store.getLeagueTeamMap(this.leagueKey).pipe(first()).toPromise();
  }

  belowThreshold(balance: number): boolean {
    return balance < 0;
  }

  aboveThreshold(balance$: Observable<number>): Observable<boolean> {
    return balance$.pipe(map(b => b >= 0));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeBid(bid: any): void {
    // console.log(bid);
    this.store.deleteTentativeBid(bid.key, this.leagueKey);
  }

  validateBids() {
    this.tentativeBids.subscribe(bids => {
      const dict = {};
      this.hasDuplicate = bids.some((b, i) => {
        if (!(b.name in dict)) {
          dict[b.name] = 1;
        } else {
          return true;
        }
      });
    });
  }

  submitBids(bids: any[]): void {
    console.log(bids);
    this.store.placeBids(this.leagueKey, bids);
  }

  getTeamName(teamId: number): string {
    return this.teamMap.get(teamId);
  }
}
