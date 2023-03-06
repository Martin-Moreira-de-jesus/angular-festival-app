import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { map, Observable } from 'rxjs'
import { Editor } from '../models/editor'

@Injectable({
  providedIn: 'root',
})
export class EditorsService {
  constructor(db: AngularFirestore) {
    this.editorsStore = db
    this.editorsCollection = db.collection(this.path)
  }

  private path = '/editors/'
  private editorsStore: AngularFirestore
  private editorsCollection: AngularFirestoreCollection<Editor>

  getEditors(): Observable<Editor[]> {
    return this.editorsCollection
      .valueChanges({ idField: 'id' })
      .pipe(map(docs => docs.map(doc => Editor.fromJSON(doc))))
  }

  getEditor(id: string): Observable<Editor> {
    return this.editorsCollection
      .doc<Editor>(id)
      .valueChanges()
      .pipe(map(doc => Editor.fromJSON(doc)))
  }

  updateEditor(editor: Editor): void {
    this.editorsCollection.doc(editor.id).update(Object.assign({}, editor))
  }

  pushEditor(editor: Editor): void {
    if (editor.id === '' || editor.id == null) {
      editor.id = this.editorsStore.createId()
    }
    this.editorsCollection
      .doc(editor.id)
      .get()
      .subscribe(doc => {
        if (!doc.exists) {
          this.editorsCollection.doc(editor.id).set(Object.assign({}, editor))
        }
      })
  }

  deleteEditor(editor: Editor): void {
    this.editorsStore.doc<Editor>(this.path + editor.id).delete()
  }
}
