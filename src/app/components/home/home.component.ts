
import { Observable } from 'rxjs/Observable';
//import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

////////////////////////////////////
import { AngularFireModule } from 'angularfire2';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';

import * as firebase from 'firebase/app';
import 'firebase/database';
import { Inject, Injectable } from '@angular/core';
import { FirebaseAppConfigToken, FirebaseAppConfig, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AngularFireDatabase]

})
export class HomeComponent implements OnInit {


  //itemsRef: AngularFireList<any>;
  items: FirebaseListObservable<any[]>;
  it: Observable<any[]>;

  com:any=[];

  constructor(public db: AngularFireDatabase) {


    this.items = db.list('/comment');
    this.it = this.items
    this.it.subscribe(s => {
      s.forEach(d => {
        d.comment
        console.log(d.comment);
      })
    })

    /* this.itemsRef = db.list('/comment');
      this.items = this.itemsRef.valueChanges();
      console.log("items"+this.itemsRef);
      this.items.subscribe(s => {
        
        s.forEach(ds => {
          ds.comment
          console.log(ds.comment);
        })
  
      })   
    */
  }

  ngOnInit() {

  }


  deleteItem(item: any) {
    //this.itemsRef.remove(item.$key);
    /* console.log(item.$key)
    this.items.remove(item.$key); */
    /*  if(confirm("คุณต้องการลบข้อมูลนี้"+item.comment)){
       this.itemsRef.remove(item.$key).then(()=>{
         alert('ลบแล้ว')
       })
     } */
     if(confirm("ต้องการลบ " +item.comment)){
      this.items.remove(item.$key).then(() =>{
          alert("ลบเรียบร้อย");
      });
      
    }
  }
  editcom($key, item) {
    console.log(item.$key)
    console.log("1:", item.comment)
    this.db.object('comment/'+$key).subscribe(da => {
      this.com = da
      console.log(this.com)
    })
  }
  save(com){
    this.db.list('comment/').update(com.$key,{
      comment: com.comment
    })
  }

}
