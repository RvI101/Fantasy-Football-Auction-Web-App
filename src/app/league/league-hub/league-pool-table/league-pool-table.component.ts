import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { filter, take, toArray, tap, scan } from 'rxjs/operators';
import { StoreService } from 'src/app/store.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-league-pool-table',
  templateUrl: './league-pool-table.component.html',
  styleUrls: ['./league-pool-table.component.css']
})
export class LeaguePoolTableComponent implements OnInit, OnChanges {
  @Input() selectedTeam: string;
  @Input() players$: Observable<Player>;
  @Input() leagueId: string;
  visiblePlayers$: Observable<Player[]>;
  bidAmounts: number[];
  constructor(private store: StoreService, private fb: FormBuilder) {
  }

  ngOnInit() { }

  ngOnChanges() {
    this.visiblePlayers$ = this.players$.pipe(
      filter(p => ((p.team === this.selectedTeam) && this.isAvailable(p))),
      toArray()
      );
    this.visiblePlayers$.subscribe(p => {
      const len = p.length;
      this.bidAmounts = new Array(len).fill(0);
    });
  }

  isAvailable(player: Player): boolean {
    return player.status === 'Available';
  }

  markBid(player: any, amount: number): void {
    const tentativeBid = {
      player,
      amount,
      name: player.name
    };
    this.store.markTentativeBid(this.leagueId, tentativeBid);
  }
}
