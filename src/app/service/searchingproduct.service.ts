import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class SearchingproductService {

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private db:AngularFireDatabase) { }

  getProduct(start, end) : FirebaseListObservable<any>{
    return this.db.list('/product/vegetable',{
      query : {
        limitToFirst: 10,
        orderByChild: 'name',
        startAt: start,
        endAt: end
      }
    });
  }
  getfertilizer(start, end) : FirebaseListObservable<any>{
    return this.db.list('/product/fertilizer',{
      query : {
        limitToFirst: 10,
        orderByChild: 'name',
        startAt: start,
        endAt: end
      }
    });
  }
  getother(start, end) : FirebaseListObservable<any>{
    return this.db.list('/product/other',{
      query : {
        limitToFirst: 10,
        orderByChild: 'name',
        startAt: start,
        endAt: end
      }
    });
  }

  


  getItemsList(query={}): FirebaseListObservable<any[]> {
    return this.db.list('/product/vegetable', {
      query: query
    });
  }
  getItemsListpuy(query={}): FirebaseListObservable<any[]> {
    return this.db.list('/product/fertilizer', {
      query: query
    });
  }
  getItemsListother(query={}): FirebaseListObservable<any[]> {
    return this.db.list('/product/other', {
      query: query
    });
  }

  getItemsListorder(query={}): FirebaseListObservable<any[]> {
    return this.db.list('/zzzorder', {
      query: query
    });
  }
///////////////////////////////////////////////////////
  getMovies(start, end): FirebaseListObservable<any> {
    return this.db.list('/zzzorder', {
      query: {
        orderByChild: 'มกราคม2018',
        limitToFirst: 5,
        startAt: start,
        endAt: end
      }
    });
  }
  getMovies2(start, end): FirebaseListObservable<any> {
    return this.db.list('/zzzorder', {
      query: {
        orderByChild: 'มกราคม2018',
        limitToFirst: 5,
        startAt: start,
        endAt: end
      }
    });
  }
  
  
}
