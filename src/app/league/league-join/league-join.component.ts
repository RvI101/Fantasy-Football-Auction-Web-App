import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { StoreService } from 'src/app/store.service';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-league-join',
  templateUrl: './league-join.component.html',
  styleUrls: ['./league-join.component.css']
})
export class LeagueJoinComponent implements OnInit {
  lId: string;
  uid: string;
  constructor(private afAuth: AngularFireAuth, private store: StoreService, private toastService: ToastService) {
    this.uid = afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
  }

  joinLeague(): void {
    const hasJoined = this.store.isMember(this.lId);
    if (!hasJoined) {
      this.store.joinLeague(this.lId);
      this.showJoinToast();
    } else {
      this.showErrorToast();
    }
  }

  showJoinToast() {
    this.toastService.show(`You have joined League ${this.lId}`);
  }

  showErrorToast() {
    this.toastService.show(`You have already joined this League!`);
  }
}
