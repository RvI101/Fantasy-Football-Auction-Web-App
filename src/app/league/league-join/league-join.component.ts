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
  constructor(private store: StoreService, private toastService: ToastService) {
  }

  ngOnInit() {
  }

  joinLeague(): void {
    this.store.joinLeague(this.lId)
      .subscribe(canJoin => {
        if (canJoin) {
          this.showJoinToast();
        } else {
          this.showInvalidToast();
        }
      },
      err => {
        this.showErrorToast();
        console.log(err);
      }
      );
    this.showJoinToast();
  }

  showJoinToast() {
    this.toastService.show(`You have joined league ${this.lId}`);
  }

  showErrorToast() {
    this.toastService.show(`Something went wrong when attempting to join this league`);
  }

  showInvalidToast() {
    this.toastService.show(`You have already joined this league!`);
  }
}
