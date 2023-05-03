

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { map } from 'rxjs';
import { Chat } from 'src/app/models/chat';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-live-room',
  templateUrl: './live-room.component.html',
  styleUrls: ['./live-room.component.css']
})

export class LiveRoomComponent implements OnInit {

  frmChat = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  chatList: any;

  constructor(
    private fbs: FirebaseService
  ) {

  }
  ngOnInit(): void {
    this.getAll();
  }

  sendMessage() {
    const now = new Date();
    let txt = this.frmChat?.value.message ?? "";
    const data: Chat = {
      id: now.getTime().toString(),
      message: txt,
      date: moment(now).format('YYYY-MM-DD h:mm:ss'),
    }


    this.fbs.saveDataFirebase(data, '/chats');

  }

  getAll() {
    this.fbs.getAll('/chats').snapshotChanges().pipe(
      map(changes => changes.map(item => ({ id: item.payload.doc.id, ...item.payload.doc.data() })))
    ).subscribe(resp => {
      this.chatList = resp;
    });
  }

  upload(event: any) {
    const now = new Date();
    let txt = this.frmChat?.value.message ?? "";
    console.log('txt', event.target.files[0]);
    this.fbs.uploadImage(event.target.files[0])
      .then(async (response) =>  {        
        let url = await response.ref.getDownloadURL()        
        const data: Chat = {
          id: now.getTime().toString(),          
          message: txt,
          urlImage: url,
          date: moment(now).format('YYYY-MM-DD h:mm:ss'),
        }

        this.fbs.saveDataFirebase(data, '/chats');
      });
  }

}
