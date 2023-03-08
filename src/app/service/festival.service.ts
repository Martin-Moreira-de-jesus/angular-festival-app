import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Festival } from '../models/festival'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root',
})
export class FestivalsService {
  constructor(db: AngularFirestore) {
    this.festivalStore = db
    this.festivalCollection = db.collection(this.path)
  }

  private path = '/festivals/'
  private festivalStore: AngularFirestore
  private festivalCollection: AngularFirestoreCollection<Festival>

  getFestivals(): Observable<Festival[]> {
    return this.festivalCollection
      .valueChanges({ idField: 'id' })
      .pipe(map(data => data.map(doc => Festival.fromJSON(doc))))
  }

  getFestival(id: string): Observable<Festival> {
    return this.festivalCollection
      .doc<Festival>(id)
      .valueChanges()
      .pipe(map(doc => Festival.fromJSON(doc)))
  }

  updateFestival(festival: Festival): void {
    this.festivalCollection.doc(festival.id).update(Object.assign({}, festival))
  }

  pushFestival(festival: Festival) {
    if (festival.id === '' || festival.id == null) {
      festival.id = this.festivalStore.createId()
    }
    this.festivalCollection
      .doc(festival.id)
      .get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.festivalCollection
            .doc(festival.id)
            .set(Object.assign({}, festival))
        }
      })
  }

  deleteFestival(festival: Festival) {
    this.festivalStore.doc<Festival>(this.path + festival.id).delete()
  }
}
