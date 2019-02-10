import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { ActivatedRoute, Router } from '@angular/router';
import { ScorllService } from './../../scorllservice/scorll.service';
import { SearchingproductService } from './../../service/searchingproduct.service';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { start } from 'repl';
import * as firebase from 'firebase';
import { ExportService } from '../../export/export.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

@Component({
  selector: 'app-orderall',
  templateUrl: './orderall.component.html',
  styleUrls: ['./orderall.component.css'],
  providers: [AngularFireDatabase]
})
export class OrderallComponent implements OnInit {
  list: FirebaseListObservable<any[]>;
  wiki;
  me = [];
  me2 = [];

  mhot = [];
  mhots = [];

  month = [];
  month_year = [];
  message = ''
  item: any;
  data = [];
  dataDate = [];
  month1: string;
  year1: string;

  startAt = new Subject()
  endAt = new Subject()
  lastKeypress: number = 0;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router,
    private search: SearchingproductService, private excelService: ExportService) {

    // this.db.list('zzzorder').subscribe((data:any) => {
    //   console.log(data)
    // })

    // this.list = this.db.list(`zzzorder/`);
    // this.list.subscribe(res => {
    //   res.forEach(dd => {
    //     //for (var x in dd) {
    //     this.data = Object.values(dd)
    //     //}

    //     this.dataDate.push(dd)
        
    //   })

    //   for (var i = 0; i < 12; i++) {
    //     this.month[i] = [];
    //     this.month_year[i] = [];
    //     for (var j = 0; j < this.data.length; j++) {
    //       if (i == this.data[j].datemonth - 1) {
    //         this.month[i].push(this.data[j]);
    //         if (this.month_year[i].findIndex(obj => (obj == this.data[j].dateyear)) == -1)
    //           this.month_year[i].push(this.data[j].dateyear);
    //       }
    //     }
    //   }

    //  // console.log("Month: ", this.month);
    // });
  }


  // onlyUnique(value, index, self) {
  //   return self.indexOf((value) => (value.dateyear === self.dateyear)) === index;
  // }

  ngOnInit() {

  }


  // exportData(m, lis) {
  //   console.log(m,lis.dateyear)
  //   var data = [];
  //   for (var i = 0; i < this.month[m].length; i++) {
  //     if (this.month[m][i].dateyear == lis.dateyear)
  //       data.push(this.month[m][i]);
  //   }

  //  console.log(data);
  //   var k=[];
  //   for (var i = 0; i < data.length; i++) {
  //     //var menu_name = "";
  //     if(data[i].menus){
  //       for (var j = 0; j < data[i].menus.length; j++) {
  //         var date = "";
  //         if (data[i].dateday < 10) date += "0" + data[i].dateday;
  //         else date += data[i].dateday;
  //         if (data[i].datemonth < 10) date += "-" + "0" + data[i].datemonth;
  //         else date += "-" + data[i].datemonth;
  //         date += "-" + data[i].dateyear;
         
          
  //         k.push({
          
  //           "วันเดือนปี": date,
  //           "ชื่อลูกค้า": data[i].name + ' ' + data[i].lname,
  //           "ชื่อเมนู": data[i].menus[j].name,
  //           "จำนวน": data[i].menus[j].count,
  //           "ราคา": data[i].menus[j].price,
  //           "รวม": data[i].menus[j].count *  data[i].menus[j].price
  //         });
  
  //         // menu_name += " " + this.me2[i].menus[j].name;
  //       }
  //     }

      
  //     console.log(k)
      
  //   }
  //   this.excelService.exportAsExcelFile(k, date)

  // }


  /* showw() {
    
    if(this.month1 && this.year1){
      console.log(this.month1,this.year1)
      this.item = this.db.object(`zzzorder/${this.month1}${this.year1}`,{preserveSnapshot:true});
      this.item.subscribe(snapshot => {
        var ret=[];
        var ret1=[];

        var month = this.month1
        var year = this.year1
        if((month!=null)&&(year!=null)){
          snapshot.forEach(function (childSnapshot){
            var item = childSnapshot.val();
           
            if((item.datemonth==month)&&(item.dateyear==year)){
              console.log(item.datemonth)
              ret1.push({
                "month": item.datemonth,
                "year": item.dateyear
              })
            }
          })
        }
      })
      
    }
  }
 */
  monthOne(num){
    this.data = []
    
    var mon = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม ", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    this.db.list(`/zzzorder`).subscribe((data) => {
      for(let i=0; i<data.length; i++){
        if(mon[num] == data[i].$key){
          this.data = (Object.values(data[i]))
          console.log(data[i].$key, mon[num])
        }
      }
    })
  }

  exportData(num, data){
    var datas = []
    var datetoex = data.dateday+'/'+data.datemonth+'/'+data.dateyear
    console.log(data)
    for(let i=0; i<data.menus.length; i++){
      datas.push({
        'ลำดับ': i+1,
        'ชื่อสินค้า': data.menus[i].name,
        'จำนวน': data.menus[i].num,
        'ราคา': data.menus[i].price,
      })
    }
    
    this.excelService.exportAsExcelFile(datas,datetoex)
  }

}
