import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersRef: AngularFireObject<any>;
  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.usersRef = this.db.object('users');
    // this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const name = user.displayName;
        const userObj = {isAnonymous, uid, name};
        this.db.object(`users/${uid}`).update(userObj);
      } else {
        // User is signed out.
        // ...
        this.router.navigate(['/']);
      }
    });
   }

  ngOnInit() {
  }
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  firstWord(name: string): string {
    if (!name || name.length === 0) {
      return '';
    }
    return name.split(' ')[0];
  }


}
