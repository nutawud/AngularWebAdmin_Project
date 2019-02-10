import { element } from 'protractor';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { ScorllService } from './../../scorllservice/scorll.service';


import { ExportService } from './../../export/export.service';
import { PERSONS, Person } from './../../model';
import { Angular2Csv } from 'angular2-csv';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css'],
  providers: [ExportService]
})
export class ListuserComponent implements OnInit {

  persons: Person[];
  exportExcel = [];
  s1 = [];
  s2 = [];
  listuser: FirebaseListObservable<any[]>;
  authState: any = null;

  list = new BehaviorSubject([]);

  batch = 2
  lastkey = ''
  finished = false

  listdatauser = [];
  showSpinner: boolean = true;


  me = [];
  me2 = [];
  copy = [];

  d1=[]

  constructor(private router: Router,
    private userdb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private scorll: ScorllService,

    private excelService: ExportService) {

    this.listuser = this.userdb.list('/userProfile');
    this.excelService = excelService;

    this.userdb.list('/userProfile').subscribe(ds => {
     
      ds.forEach(dd => {
        this.me = dd.qorder;
        for (var x in this.me) {
          this.me2.push(this.me[x]);
        }
      })

      var data = [];
      var k = 0;
      console.log("Data After Change");
      for (var i=0; i<this.me2.length; i++) {
          //var menu_name = "";
         if(this.me2[i].menus){
          for (var j=0; j<this.me2[i].menus.length; j++) {
            var date = "";
             if (this.me2[i].dateday<10) date += "0" + this.me2[i].dateday;
             else date += this.me2[i].dateday;
             if (this.me2[i].datemonth<10) date += "-" + "0" + this.me2[i].datemonth;
             else date += "-" + this.me2[i].datemonth;
             date += "-" + this.me2[i].dateyear;
            data[k] = {
              "ครั้งที่": i+1,
              "วันเดือนปี": date,
              "ชื่อลูกค้า": this.me2[i].userName + ' ' + this.me2[i].userLastName,
              "ชื่อเมนู": this.me2[i].menus[j].name,
            };
            k++;
           // menu_name += " " + this.me2[i].menus[j].name;
          }
         }
         

        //  data[k] = {
        //   name: this.me2[i].userName + ' ' + this.me2[i].userLastName,
        //   menu_name: menu_name
        // };
        // k++;
      }
    })


      
      //this.excelService.exportAsExcelFile(this.d1, 'listuser')
      
    
   
      // Unit (id,name,description)
    
    /* this.userdb.list('zzzorder').subscribe(ds => {
      console.log(ds)
      
      ds.forEach(dd => {
        this.me = dd.menus
        
        for (var x in this.me) {
          this.me2.push(this.me[x])

        }
        
        
      })
      console.log(this.me2)
      //this.excelService.exportAsExcelFile(this.me2, 'listuser')
    }) */


  }

  searchDate(strSt, strEn) {
    var startD = new Date(strSt);
    var endD = new Date(strEn);
  }

  all(){
    
      this.userdb.list('zzzorder').subscribe(ds => {
        
        ds.forEach(dd => {
          this.me = dd.menus
          
          for (var x in this.me) {
            this.me2.push(this.me[x])
  
          }
          
          
        })
        console.log(this.me2)
        //this.excelService.exportAsExcelFile(this.me2, 'listuser')
      })
    
  }

  exportToExcel(event) {
    this.userdb.list('/userProfile').subscribe(da => {
      this.exportExcel = da
      console.log(this.exportExcel)
    })
    this.excelService.exportAsExcelFile(this.exportExcel, 'listuser')

  }


  ngOnInit(): void {
    this.scrolllist()
  }

  onScroll() {
    console.log('scroll!!')
    this.scrolllist()
  }

  private scrolllist(key?) {
    if (this.finished) return

    this.scorll
      .scrolllist(this.batch + 1, this.lastkey)
      .do(list => {
        this.lastkey = _.last(list)['$key']
        const newVeget = _.slice(list, 0, this.batch)

        const currentVeget = this.list.getValue()

        if (this.lastkey == _.last(newVeget)['$key']) {
          this.finished = true
        }

        this.list.next(_.concat(currentVeget, newVeget))
      })
      .take(1)
      .subscribe()
  }
  removeuser(user) {
    //this.listuser.remove(id)
    console.log(user.$key)
    if (confirm("ต้องการลบ " + user.name + " " + user.lname)) {

      this.listuser.remove(user.$key).then(() => {
        alert("ลบเรียบร้อย");
      });

    }

  }

  getUser(user) {
    this.router.navigate([`/orderuser/${user.$key}`]);
  }

  getlist(userkey) {
    this.userdb.object(`userProfile/${userkey}`).subscribe(user => {
      this.listdatauser = user
      console.log(this.listdatauser)
    })
  }



}
