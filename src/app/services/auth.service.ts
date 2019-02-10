import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    public AdminProfile: firebase.database.Reference;
    public currentAdmin: firebase.User;

    constructor(private afAuth: AngularFireAuth) {
        firebase.auth().onAuthStateChanged(admin => {
            if (admin) {
                this.currentAdmin = admin;
                this.AdminProfile = firebase.database().ref(`/AdminProfile/${admin.uid}`);
            }
        });
    }


    getAdminProfile(): firebase.database.Reference {
        return this.AdminProfile;
    }


    updateEmailadmin(newEmail: string, password: string): Promise<any> {
        const credential = firebase.auth.EmailAuthProvider
            .credential(this.currentAdmin.email, password);

        return this.currentAdmin.reauthenticateWithCredential(credential).then(user => {
            this.currentAdmin.updateEmail(newEmail).then(user => {
                this.AdminProfile.update({ email: newEmail });
            });
        });
    }

    updatePasswordadmin(newPassword: string, password: string):Promise<any> {
        const credential = firebase.auth.EmailAuthProvider
            .credential(this.currentAdmin.email, password);

        return this.currentAdmin.reauthenticateWithCredential(credential).then(admin => {
            this.currentAdmin.updatePassword(newPassword).then(admin => {
                this.AdminProfile.update({ password: newPassword });
                console.log("Password Changed", newPassword);
            }, error => {
                console.log(error);
            });
        });
    }

}
