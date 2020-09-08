import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-league-member-squad',
  templateUrl: './league-member-squad.component.html',
  styleUrls: ['./league-member-squad.component.css']
})
export class LeagueMemberSquadComponent implements OnInit, OnDestroy {

  @Input() leagueId: string;
  @Input() uid: string;
  @Input() teamMap: Map<number, string>;
  resBids$: Observable<any[]>;
  unsubscribe$ = new Subject();
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.resBids$ = this.store.getResolvedBids(this.leagueId, this.uid)
      .pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
