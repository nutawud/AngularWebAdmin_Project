import { SearchingproductService } from './../../service/searchingproduct.service';
import { ScorllService } from './../../scorllservice/scorll.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [AngularFireDatabase]
})
export class ProductComponent implements OnInit {
  name:string
  key:string
  properties:string
  price:number;
  num:number;
  count:number = 1;
  files;

  edteStart:boolean = false;

  item:any=[];
  item2:any=[];
  item3:any=[];

  
  prod:FirebaseListObservable<any[]>;
  prodpuy:FirebaseListObservable<any[]>;
  prodother:FirebaseListObservable<any[]>;

  p;
  p2;
  p3
  //prod:any=[];
  startAt = new Subject()
  endAt = new Subject()
  lastKeypress: number = 0;
  showSpinner: boolean = true;

  //scorll
  veget = new BehaviorSubject([]);
  puks = new BehaviorSubject([]);
  other = new BehaviorSubject([]);

  batch = 3
  lastkey = ''
  finished = false
  
constructor(public db: AngularFireDatabase ,private router: Router, private search: SearchingproductService,
  private scorll:ScorllService) { 
    this.getpak()
    this.getpuy()
    this.getother()
  }

  getpak(){
    this.prod = this.search.getItemsList()
  } 
  getpuy(){
    this.prodpuy = this.search.getItemsListpuy()
  }
  getother(){
    this.prodother = this.search.getItemsListother()
  }
/////////search/////////
  ngOnInit() {

    this.search.getProduct(this.startAt, this.endAt)
        .subscribe(p => this.p = p) 

    this.search.getfertilizer(this.startAt, this.endAt)
        .subscribe(p2 => this.p2 = p2) 

    this.search.getother(this.startAt, this.endAt)
        .subscribe(p3 => this.p3 = p3) 

      this.scrollveget()
       this.scrollpuks()
      this.scrollother()
  }

  onScroll(){
    console.log('scroll!!')
    this.scrollveget()
    this.scrollpuks()
}

private scrollveget(key?){
    if(this.finished) return

    this.scorll
    .scrollveget(this.batch+1,this.lastkey)
    .do(veget =>{
      this.lastkey = _.last(veget)['$key']
      const newVeget = _.slice(veget,0,this.batch)

      const currentVeget = this.veget.getValue()

      if(this.lastkey == _.last(newVeget)['$key']){
        this.finished = true
      }

      this.veget.next(_.concat(currentVeget,newVeget))
    })
    .take(1)
    .subscribe()
}

private scrollpuks(key?){
  if(this.finished) return

  this.scorll
  .scrollpuks(this.batch+1,this.lastkey)
  .do(puks =>{
    this.lastkey = _.last(puks)['$key']
    const newPuks = _.slice(puks,0,this.batch)

    const currentPuks = this.puks.getValue()

    if(this.lastkey == _.last(newPuks)['$key']){
      this.finished = true
    }

    this.veget.next(_.concat(currentPuks,newPuks))
  })
  .take(1)
  .subscribe()
}

private scrollother(key?){
if(this.finished) return

this.scorll
.scrollother(this.batch+1,this.lastkey)
.do(other =>{
  this.lastkey = _.last(other)['$key']
  const newOther = _.slice(other,0,this.batch)

  const currentOther = this.other.getValue()

  if(this.lastkey == _.last(newOther)['$key']){
    this.finished = true
  }

  this.other.next(_.concat(currentOther,newOther))
})
.take(1)
.subscribe()
}



  searchs($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      let queryText = $event.target.value
      this.startAt.next(queryText)
      this.endAt.next(queryText+'\uf8ff')
    }
    this.lastKeypress = $event.timeStamp
  } 
  searchs2($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      let queryText = $event.target.value
      this.startAt.next(queryText)
      this.endAt.next(queryText+'\uf8ff')
    }
    this.lastKeypress = $event.timeStamp
  }
  searchs3($event){
    if ($event.timeStamp - this.lastKeypress > 200) {
      let queryText = $event.target.value
      this.startAt.next(queryText)
      this.endAt.next(queryText+'\uf8ff')
    }
    this.lastKeypress = $event.timeStamp
  }

////////////////////////////
  editpak($key,paks){
    console.log("ผัก:",paks.name)
      this.db.object('product/vegetable/'+$key).subscribe(da => {
      this.item = da
    }) 
  }
  saveedit(item){
    //console.log(item2);
    this.db.list('product/vegetable').update(item.$key,{
      name: item.name,
      properties: item.properties,
      price: item.price,
      num: item.num
    });
    location.reload();
  }

  remove(paks){
    console.log(paks.$key);
    if(confirm("ต้องการลบ " +paks.name)){
      this.prod.remove(paks.$key).then(() =>{
          alert("ลบเรียบร้อย");
      });
      
    }
    
  }

  upload(e){
    let files:any = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e:any) => {
      this.files = e.target.result;
    }
    reader.readAsDataURL(files);
  } 
  uploadImage(imageBase64){
    
    this.db.list('product/vegetable').push({
      name: this.name,
      properties: this.properties,
      price: this.price,
      num: this.num,
      count: this.count,
      photo:imageBase64,  
    })
  }
  addpro(): void{
      if(this.files!=null){
        this.uploadImage(this.files);
        setTimeout(() => {
          location.reload()
        }, 5000);
      }
  } 
///////////////////////////////////////////
  upload2(e){
    let files:any = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e:any) => {
      this.files = e.target.result;
    }
    reader.readAsDataURL(files);
  } 
  uploadImage2(imageBase64){

    this.db.list('product/fertilizer').push({
      name: this.name,
      properties: this.properties,
      price: this.price,
      num: this.num,
      count: this.count,
      photo:imageBase64,  
    })
  }
  addpropuy(): void{
    if(this.files!=null){
      this.uploadImage2(this.files);
      setTimeout(() => {
        location.reload()
      }, 5000);
    }
  }
  editpuy($key,puys){
    console.log("ปุ๋ย:",puys.name)
    this.db.object('product/fertilizer/'+$key).subscribe(da => {
    this.item2 = da
    }) 
  }
  saveeditpuy(item2){
    //console.log(item2);
    this.db.list('product/fertilizer').update(item2.$key,{
      name: item2.name,
      properties: item2.properties,
      price: item2.price,
      num: item2.num
    });
    location.reload();
  }
  removepuy(puys){
    console.log(puys.$key);
    if(confirm("ต้องการลบ " +puys.name)){
      this.prodpuy.remove(puys.$key).then(() =>{
          alert("ลบเรียบร้อย");
      });
      
    }
    
  }
////////////////////อื่นๆ///////////////////
upload3(e){
  let files:any = e.target.files[0];
  let reader = new FileReader();
  reader.onload = (e:any) => {
    this.files = e.target.result;
  }
  reader.readAsDataURL(files);
} 
uploadImage3(imageBase64){
  
  this.db.list('product/other').push({
    name: this.name,
    properties: this.properties,
    price: this.price,
    num: this.num,
    count: this.count,
    photo:imageBase64,  
  })
}
addproother(): void{
  if(this.files!=null){
    this.uploadImage3(this.files);
    setTimeout(() => {
      location.reload()
    }, 5000);
  }
}
editother($key,other){
  console.log("อื่นๆ:",other.name)
  this.db.object('product/other/'+$key).subscribe(da => {
  this.item3 = da
  }) 
}
saveeditother(item3){
  //console.log(item2);
  this.db.list('product/other').update(item3.$key,{
    name: item3.name,
    properties: item3.properties,
    price: item3.price,
    num: item3.num
  });
  location.reload();
}
removeother(other){
  console.log(other.$key);
  if(confirm("ต้องการลบ " +other.name)){
    this.prodother.remove(other.$key).then(() =>{
        alert("ลบเรียบร้อย");
    });
    
  }
  
}

}
