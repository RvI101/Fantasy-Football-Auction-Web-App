import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-league-create',
  templateUrl: './league-create.component.html',
  styleUrls: ['./league-create.component.css']
})
export class LeagueCreateComponent implements OnInit {
  name: string;
  lId: string;
  constructor(private store: StoreService) {}

  ngOnInit() {
  }
  createLeague(): void {
    this.store.createLeague(this.name);
    console.log('League created');
  }
}
