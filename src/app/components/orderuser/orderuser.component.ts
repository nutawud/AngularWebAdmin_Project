import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScorllService } from './../../scorllservice/scorll.service';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ExportService } from '../../export/export.service';
@Component({
  selector: 'app-orderuser',
  templateUrl: './orderuser.component.html',
  styleUrls: ['./orderuser.component.css'],
  providers: [AngularFireDatabase]
})
export class OrderuserComponent implements OnInit {

  order: FirebaseListObservable<any[]>;
  wiki: any = [];
  list: any = [];
  listtotal: any = [];
  address: any;

  excel=[];

  orderuser = new BehaviorSubject([]);

  batch = 2
  lastkey = ''
  finished = false

  constructor(private route: ActivatedRoute, 
    private db: AngularFireDatabase, 
    private router: Router, 
    private scorll: ScorllService,
    private excelService: ExportService) {

      this.excelService = excelService;

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.getWikiByKey(id)
    }
    this.scrollorderuser()
  }

  onScroll() {
    console.log('scroll!!')
    this.scrollorderuser()

  }

  private scrollorderuser(key?) {
    if (this.finished) return

    this.scorll
      .scrollorderuser(this.batch + 1, this.lastkey)
      .do(orderuser => {
        this.lastkey = _.last(orderuser)['$key']
        const newOrderuser = _.slice(orderuser, 0, this.batch)

        const currentOrderuser = this.orderuser.getValue()

        if (this.lastkey == _.last(newOrderuser)['$key']) {
          this.finished = true
        }

        this.orderuser.next(_.concat(currentOrderuser, newOrderuser))
      })
      .take(1)
      .subscribe()
  }



  getWikiByKey(id) {
    this.db.list('/userProfile/' + id + '/qorder/').subscribe(data => {
      this.wiki = data;
      console.log(this.wiki);
    });
  }
  gotolistorder($key) {
    this.list = $key.menus
    this.listtotal = $key.total
    this.address = $key.userAddress
  }

  exportToExcel(or) {
    this.excel = or.menus
    console.log(this.excel)
    this.excelService.exportAsExcelFile(this.excel,'listuser')
  }

}
