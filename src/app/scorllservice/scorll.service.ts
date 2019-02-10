import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
@Injectable()
export class ScorllService {

  constructor(private db: AngularFireDatabase) { }

  scrollveget(batch, lastkey?) {
    let query = {
      orderByKey: true,
      limitToFirst: batch,
    }
    if (lastkey) query['startAt'] = lastkey

    return this.db.list('/product/vegetable', {
      query
    })
  }

  scrollpuks(batch, lastkey?) {
    let query = {
      orderByKey: true,
      limitToFirst: batch,
    }
    if (lastkey) query['startAt'] = lastkey

    return this.db.list('/product/fertilizer', {
      query
    })
  }

  scrollother(batch, lastkey?) {
    let query = {
      orderByKey: true,
      limitToFirst: batch,
    }
    if (lastkey) query['startAt'] = lastkey

    return this.db.list('/product/other', {
      query
    })
  }

  scrolllist(batch, lastkey?) {
    let query = {
      orderByKey: true,
      limitToFirst: batch,
    }
    if (lastkey) query['startAt'] = lastkey

    return this.db.list('/userProfile', {
      query
    })
  }

  scrollorderuser(batch, lastkey?) {
    let query = {
      orderByKey: true,
      limitToFirst: batch,
    }
    if (lastkey) query['startAt'] = lastkey

    return this.db.list('/userProfile/', {
      query
    })
  }
}
