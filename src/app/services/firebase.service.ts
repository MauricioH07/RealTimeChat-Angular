import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {

  }

  saveDataFirebase(data: any, path: any) {
    this.db.collection(path).add(data);
  }

  getAll(path: any): AngularFirestoreCollection {
    return this.db.collection(path, ref => ref.orderBy('date'));
  }

  uploadImage(file: any){
    return this.storage.upload(file.name, file);
  }

}
