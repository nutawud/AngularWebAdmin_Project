import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editpass',
  templateUrl: './editpass.component.html',
  styleUrls: ['./editpass.component.css']
})
export class EditpassComponent implements OnInit {

  public userProfile: any;
  public DOB: string;
  
  userId:string;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private afAuth: AngularFireAuth,
    private profileProvider:AuthService,
   
    ) { 

      this.afAuth.authState.subscribe(userProfileSnapshot => {
        if(userProfileSnapshot){
          this.userId = userProfileSnapshot.uid
          console.log("ID",this.userId)
          
        }
      })
    
  }

  ngOnInit() {
    this.profileProvider.getAdminProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.DOB = userProfileSnapshot.val().DOB;
    });
  }

  updatePassword(newpassword,password) {
    var data ={
      newpassword,
      password
    }
    this.profileProvider.updatePasswordadmin(data.newpassword,data.password);
  }
}
