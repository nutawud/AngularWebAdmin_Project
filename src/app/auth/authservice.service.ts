import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthserviceService {
  public fireAuth: firebase.auth.Auth;
  public userProfileRef: firebase.database.Reference;

  constructor(private afAuth: AngularFireAuth,
    public afd: AngularFireDatabase) {

    this.fireAuth = firebase.auth();
    this.userProfileRef = firebase.database().ref('/AdminProfile');
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  signOut(): Promise<void> {
    this.userProfileRef.child(this.fireAuth.currentUser.uid).off();
    return this.afAuth.auth.signOut();
  }
}
