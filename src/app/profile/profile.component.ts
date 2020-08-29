import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Observable } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayName$: Observable<string>;
  newName: string;

  constructor(private store: StoreService, private toast: ToastService) { }

  ngOnInit() {
    this.displayName$ = this.store.getUserDisplayName();
  }

  changeDisplayName(dpName: string): void {
    this.store.setUserDisplayName(dpName);
    this.toast.show(`Your display name has been set to ${dpName}`);
  }

}
