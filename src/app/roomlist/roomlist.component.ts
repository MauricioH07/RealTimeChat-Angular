import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Users } from 'src/app/models/newuser';
import { RoomData } from '../models/roomdata'
import { map } from 'rxjs';
import * as moment from 'moment';

export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};



@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {

  nickname: any = '';
  displayedColumns: string[] = ['roomname'];
  rooms: any[] = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private router: Router, public datepipe: DatePipe, private fbs: FirebaseService,
    private db: AngularFirestore) {
    this.nickname = localStorage.getItem('nickname');
    const a = this.db.collection('rooms/').get();
    console.log("Andamos aca 0", a)
    a.forEach(e => {
      console.log("Andamos aca")
      this.rooms = [];
      e.forEach(f => {
        this.rooms.push(f.data());
        console.log(this.rooms)
        this.isLoadingResults = false;

      })
    })

  }

  ngOnInit(): void {
    // this.router.navigate(['/login']);
  }

  enterChatRoom(roomname: string) {

    const now = new Date();
    const roomdata: RoomData = {
      roomname: roomname,
      nickname: this.nickname,
      message: `${this.nickname} enter the room`,
      date: moment(now).format('YYYY-MM-DD h:mm:ss'),
      type: 'join'
    };

    this.fbs.saveDataFirebase(roomdata, '/chats');


    // const room = form;
    const db = firebase.firestore();
    const collection = db.collection('roomusers/')
    collection.get().then((snapshot) => {
      const userFind = snapshot.docs.find((doc) => doc.data()['nickname'] === this.nickname && doc.data()['roomname'] === roomname)

      if (userFind == undefined) {

        const data: Users = {
              roomname: roomname,
              nickname: this.nickname,
              status: 'online'
            };
  
            this.fbs.saveDataFirebase(data, '/roomusers');

      }else{

      const upd = this.db.doc(`roomusers/${userFind?.id}`)
      upd.update({ status: 'online' })
        .catch((error) => console.log('Error updating user:', error));

      }

    })

    this.router.navigate(['/chatroom', roomname]);

  }

  logout(): void {
    localStorage.removeItem('nickname');
    this.router.navigate(['/login']);
  }

}

