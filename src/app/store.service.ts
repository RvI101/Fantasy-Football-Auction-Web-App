import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from '@angular/fire/database';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, map, mergeMap, take, mergeAll, count, reduce, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlayerService } from './players.service';
import { LeagueFactoryService } from './league-factory.service';
import { League } from './models/league';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  MONEY = 100;
  leaguesRef: AngularFireList<any>;
  uid: string;
  dirtyUserLeagueEntries$: Subject<any|null>;
  userLeagueKeys$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
              private playerService: PlayerService, private leagueFactory: LeagueFactoryService) {
    this.uid = afAuth.auth.currentUser.uid;
    this.leaguesRef = db.list('leagues');
    this.dirtyUserLeagueEntries$ = new Subject();
    // Delete dirty user league entries
    this.dirtyUserLeagueEntries$.subscribe(blob => {
      console.log(blob);
      const [uid, leagueIdToDelete] = blob;
      db.list(`users/${uid}/leagues`).remove(leagueIdToDelete);
    });

    db.list(`users/${this.uid}/leagues`).snapshotChanges()
      .pipe(map(changes => changes
        .map(c => ({ key: c.payload.key, ...c.payload.val()}))));

    this.leaguesRef.stateChanges(['child_removed'])
    .subscribe(action => {
      console.log(action);
      // const adminKey = action.payload.val().adminKey;
      const lid = action.payload.val().leagueId;
      const aid = action.payload.val().admin;
      this.db.list(`users/${aid}/admin`).remove(lid);
      const members = action.payload.val().members;
      console.log(members);

      for (const key of Object.keys(members)) {
        const member = members[key];
        const tup = [member, lid];
        this.dirtyUserLeagueEntries$.next(tup);
        console.log(tup);
      }
    });
  }

  getLeague(leagueId: string): Observable<any> {
    return this.db.object(`leagues/${leagueId}`).valueChanges();
  }

  createLeague(uid: string, name: string): string {
    const newLeague: League = this.leagueFactory.getNewLeague();
    newLeague.setAdmin(uid);
    newLeague.name = name;
    const id = this.leaguesRef.push(newLeague).key;
    this.db.list(`users/${this.uid}/admin`).set(id, { leagueId: id, name });
    this.leaguesRef.update(id, {leagueId: id});

    this.db.list(`users/${this.uid}/leagues`)
      .set(id, { leagueId: id, name, status: 'bid', squadSize: 0, uid: this.uid, money: this.MONEY });
    return id;
  }

  deleteLeague(leagueId: string): void {
    console.log('deleting' + leagueId);
    this.leaguesRef.remove(leagueId);
  }

  joinLeague(leagueId: string) {
    this.db.list(`leagues/${leagueId}/members`).push(this.uid);
    this.db.list(`users/${this.uid}/leagues`)
      .set(leagueId, { leagueId, name, status: 'bid', squadSize: 0, uid: this.uid, money: this.MONEY });
    this.getLeague(leagueId)
      .subscribe(league => {
        console.log(league);
        this.db.list(`users/${this.uid}/leagues`).update(leagueId, {name: league.name});
      });

  }
  getAdminLeagues(): Observable<any> {
    return this.db.list(`users/${this.uid}/admin`).valueChanges();
  }

  getMemberLeagues(): Observable<any> {
    return this.db.list(`users/${this.uid}/leagues`).valueChanges();
  }

  isMember(leagueId: string): boolean {
    let flag = false;
    this.db.list(`users/${this.uid}/leagues`, ref => ref.orderByChild('leagueId').equalTo(leagueId))
      .valueChanges()
      .pipe(
        take(1)
      )
      .subscribe(d => flag = d ? true : false);
    return flag;
  }

  getPlayers(leagueId: string): Observable<Player> {
    return this.db.list(`leagues/${leagueId}/players`)
      .valueChanges()
      .pipe(
        take(1),
        mergeMap(val => val), // Flattens the array
        map((player: Player) => new Player(player))
      );
  }

  getUserStatus(leagueId: string): Observable<any> {
    return this.db.object(`users/${this.uid}/leagues/${leagueId}/status`).valueChanges();
  }

  markTentativeBid(leagueId: string, bid: any): void {
    const key = this.db.list(`users/${this.uid}/leagues/${leagueId}/tentativeBids`).push(bid).key;
    this.db.list(`users/${this.uid}/leagues/${leagueId}/tentativeBids`).update(key, {key});
  }

  getTentativeBids(leagueId: string): Observable<any[]> {
    return this.db.list<any>(`users/${this.uid}/leagues/${leagueId}/tentativeBids`).valueChanges();
  }

  deleteTentativeBid(key: string, leagueId: string): void {
    this.db.list(`users/${this.uid}/leagues/${leagueId}/tentativeBids`).remove(key);
  }

  getBidHistory(leagueId: string): Observable<any[]> {
    return this.db.list<any>(`users/${this.uid}/leagues/${leagueId}/bidHistory`).valueChanges();
  }

  getSquadSize(leagueId: string): Observable<number> {
    return this.db.object<number>(`users/${this.uid}/leagues/${leagueId}/squadSize`).valueChanges();
  }

  placeBids(leagueId: string, bids: any[]): void {
    bids.forEach((b, i) => {
      const id = b.player.id;
      b.uid = this.uid;
      // Placing bid on player
      this.db.list(`leagues/${leagueId}/players/${id}/bids`).set(this.uid, b);
      // Pushing bid into user bid history
      this.db.list(`users/${this.uid}/leagues/${leagueId}/bidHistory`).push(b);
    });
    // Clear already placed bids
    this.db.list(`users/${this.uid}/leagues/${leagueId}/tentativeBids`).remove();
    // Move status to WAIT
    this.db.object(`users/${this.uid}/leagues/${leagueId}/status`).set('wait');
  }

  getUserLeagueDetails(leagueId: string, userId: string): Observable<any> {
    // this.db.object(`users/${userId}/leagues/${leagueId}`).update({uid: userId});
    return this.db.object(`users/${userId}/leagues/${leagueId}`).valueChanges();
  }

  getResolvedBids(leagueId: string): Observable<any[]> {
    return this.db.list(`users/${this.uid}/leagues/${leagueId}/resolvedBids`).valueChanges();
  }

  resolveBids(leagueId: string): void {
    this.db.list<Player>(`leagues/${leagueId}/players`)
      .valueChanges()
      .pipe(
        take(1)
      ).subscribe(
        players => {
          players.forEach(p => {
            if (p.bids && p.status === 'Available') {
              const sortedBids = [...Object.values(p.bids)].map(b => b as any).sort((a, b) => b.amount - a.amount);
              const winBid = sortedBids[0];
              p.owner = winBid.uid;
              p.status = 'Owned';
              p.cost = winBid.amount;
              p.bids = null;
              winBid.status = 'success';
              winBid.player = p;
              this.db.list(`users/${p.owner}/leagues/${leagueId}/resolvedBids`).push(winBid);
              this.db.object(`leagues/${leagueId}/players/${p.id}`).update(p);
            }
          });
        }
      );
    this.db.list(`leagues/${leagueId}/members`)
      .valueChanges()
      .pipe(
        take(1),
        mergeAll()
      ).subscribe(
        m => {
          this.db.object(`users/${m}/leagues/${leagueId}`).update({status: 'bid'});
        }
      );
  }

  updateUserLeagueState(leagueId: string): void {
    const s = 15;
    const m = 100;
    const bids$ = this.db.list<any>(`users/${this.uid}/leagues/${leagueId}/resolvedBids`)
      .valueChanges()
      .pipe(
        take(1),
        mergeMap(val => val)
      );
    bids$.pipe(count())
        .subscribe(c => {
          this.db.object(`users/${this.uid}/leagues/${leagueId}`).update({squadSize: c});
          if (c === 15) {
            this.db.object(`users/${this.uid}/leagues/${leagueId}`).update({status: 'done'});
          }
        });
    bids$.pipe(
          map(b => b.amount),
          reduce((acc, curr) => acc + curr, 0))
        .subscribe(sum => {
          this.db.object(`users/${this.uid}/leagues/${leagueId}`).update({money: m - sum });
        });
  }

  getUserMoney(leagueId: string): Observable<number> {
    return this.db.object<number>(`users/${this.uid}/leagues/${leagueId}/money`).valueChanges();
  }
}
