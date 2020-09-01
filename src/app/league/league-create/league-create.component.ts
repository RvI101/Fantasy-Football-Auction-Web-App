import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-league-create',
  templateUrl: './league-create.component.html',
  styleUrls: ['./league-create.component.css']
})
export class LeagueCreateComponent implements OnInit {
  name: string;
  lId: string;
  constructor(private store: StoreService, private afAuth: AngularFireAuth) {}

  ngOnInit() {
  }
  createLeague(): void {
    const uid = this.afAuth.auth.currentUser.uid;
    this.store.createLeague(uid, this.name);
    console.log('League created');
  }
}
