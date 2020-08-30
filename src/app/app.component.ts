import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Football Auction';
  public isMenuCollapsed = true;
  usersRef: AngularFireObject<any>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.usersRef = this.db.object('users');
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     // User is signed in.
    //     const isAnonymous = user.isAnonymous;
    //     const uid = user.uid;
    //     const userObj = {isAnonymous, uid};
    //     this.usersRef.set({uid, userObj});
    //   } else {
    //     // User is signed out.
    //     // ...
    //   }
    // });
   }

  // login() {
  //   this.afAuth.auth.signInAnonymously();
  // }
  logout() {
    this.afAuth.auth.signOut();
  }

}
