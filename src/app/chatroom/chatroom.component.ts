import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs';
import { Message } from 'src/app/models/message';
import { Chat } from 'src/app/models/chat';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  chatForm = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  chatList: any;


  @ViewChild('chatcontent') chatcontent: ElementRef | any;
  scrolltop?: number | null;

  isTyping = false;
  urlImage: any = '';
  files: File[] = [];
  nickname: any = '';
  roomname: any = '';
  message = '';
  users: any[] = [];
  chats: any[] = [];
  db2: any;
  showDragZone = false;
  collectionUsers: any
  cleanDrop: any;
  selectedEmoji:any;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private fbs: FirebaseService,
    private db: AngularFirestore) {

    // Cargamos los mensajes viejos al entrar en el chat
    this.nickname = localStorage.getItem('nickname');
    this.roomname = this.route.snapshot.params['roomname'];
    this.db2 = firebase.firestore();
    const collectionChats = this.db2.collection('chats/').get()
    this.showDragZone = false;
    this.chats = [];
    collectionChats.then((resp: any) => {
      resp.forEach((data: any) => {
        this.chats.push(data.data());
      })
    })

    // Mostramos los usuarios que se encuentran en el grupo
    const collection = this.db2.collection('roomusers/')
    collection.get().then((snapshot: any) => {
      snapshot.docs.forEach((data: any) => {

        if (data.data()['status'] === 'online' && data.data()['roomname'] === this.roomname) {
          this.users.push(data.data())

        }

      })

    })


  }


  // Mandamos a llamar al metodo apra obtenero todos los mensajes 
  ngOnInit(): void {
    this.getAll()
  }

  // Obtenemos todos los mensaje al abrir el chat 
  getAll() {
    this.fbs.getAll('/chats').snapshotChanges().pipe(
      map(changes => changes.map(item => ({ id: item.payload.doc.id, ...item.payload.doc.data() })))
    ).subscribe(resp => {
      this.chats = resp;
    });
  }

  // Envio de mensajes al precionar tecla submit
  onFormSubmit(form: any) {
    const chat = form;
    const now = new Date();
    let txt = this.chatForm?.value.message ?? "";

    if (this.files.length >= 1) {
      const chat = form;
      console.log("Si entro al if")
      for (let i = 0; i < this.files.length; i++) {
        console.log("Si entro al for")
        this.sendImage(this.files[i])


        // chat.roomname = this.roomname
        this.urlImage = 'image'
        chat.nickname = this.nickname;
        chat.urlImage = 'image'
        // chat.date = moment(now).format('YYYY-MM-DD h:mm:ss');
        // chat.type = 'image';


        // this.fbs.saveDataFirebase(data, '/chats');
      }

      this.closeContainer()
      this.urlImage = ''

    } else {
      console.log("Entro al else")
      const data: Chat = {
        id: now.getTime().toString(),
        message: txt,
        date: moment(now).format('YYYY-MM-DD h:mm:ss'),
        nickname: this.nickname

      }

      chat.roomname = this.roomname;
      chat.nickname = this.nickname;
      // chat.urlImage = '';
      chat.date = moment(now).format('YYYY-MM-DD h:mm:ss');
      chat.type = 'message';


      this.fbs.saveDataFirebase(data, '/chats');

    }
    this.chatForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });

  }

  // Envio de Emojis
  select(event:any)
  {
    console.log(event);
    this.selectedEmoji = event.emoji;
    this.pasteHtmlAtCaret("<span>hi</span>");
  }

  
  pasteHtmlAtCaret(html:any) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel?.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
}


  // Dropzone para mostrar solo cuando se arrastra imagen o archivos en el
  handleDragOver(event: DragEvent) {

    event.preventDefault();
    if (event?.dataTransfer?.types.includes("Files") || event?.dataTransfer?.types.includes("image/*")) {
      this.showDragZone = true;
    } else {
      this.showDragZone = false;
    }
  }

  handleFileSelect(event: DragEvent) {
    // event.preventDefault()
    // console.log("Aqui estan los handreFileSelect")

    // const files  = event.dataTransfer?.files

    // if(files){
    //   for(let i = 0; i < files.length; i++){
    //     this.files.push(files[i])
    //   }
    // }
  }


  // Cerramos el DragZone
  closeContainer() {
    this.files = []
    return this.showDragZone = false

  }

  sendImage(file: any) {
    console.log
    const now = new Date();
    console.log('txt', file);
    this.fbs.uploadImage(file)
      .then(async (response) => {
        let url = await response.ref.getDownloadURL()
        const data: Chat = {
          id: now.getTime().toString(),
          nickname: this.nickname,
          urlImage: url,
          date: moment(now).format('YYYY-MM-DD h:mm:ss'),
        }

        this.fbs.saveDataFirebase(data, '/chats');
      });

    this.chatForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }


  // Guardamos la imagen en BD
  upload(event: any) {
    console.log
    const now = new Date();
    let txt = this.chatForm?.value.message ?? "";
    console.log('txt', event.target.files[0]);
    this.fbs.uploadImage(event.target.files[0])
      .then(async (response) => {
        let url = await response.ref.getDownloadURL()
        const data: Chat = {
          id: now.getTime().toString(),
          // message: txt,
          // nickname: this.nickname,
          urlImage: url,
          date: moment(now).format('YYYY-MM-DD h:mm:ss'),
        }

        this.fbs.saveDataFirebase(data, '/chats');
      });

    this.chatForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }


  // codigo para el dropzone
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    console.log("Aqui estan los onSelect")
    console.log(this.files)
  }

  onRemove(event: any) {
    console.log("Aqui estan los onRemove")
    console.log(this.files);
    this.files = []
  }

  // Notificacion si un usuario esta escribiendo
  onTyping(event: any) {
    this.isTyping = true;
    // enviar una señal al servidor para notificar a otros usuarios que estás escribiendo
  }

  // Se notifica cuando el usuario deje de escribir
  onStopTyping(event: any) {
    this.isTyping = false;
    // enviar una señal al servidor para notificar a otros usuarios que has dejado de escribir
  }



  // Salida de la sala de chat
  exitChat() {
    const now = new Date();
    const chat: Message = {
      roomname: this.roomname,
      nickname: this.nickname,
      message: `${this.nickname} leave the room`,
      date: moment(now).format('YYYY-MM-DD h:mm:ss'),
      type: 'exit'
    };

    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = moment(now).format('YYYY-MM-DD h:mm:ss');
    chat.message = `${this.nickname} leave the room`;
    chat.type = 'exit';
    // Guardamos el mensaje de salida en la BD
    this.fbs.saveDataFirebase(chat, '/chats')

    // Actualizamos el status cuando el usuario sale del chat
    const db = firebase.firestore();
    const collection = db.collection('roomusers/')
    collection.get().then((snapshot) => {
      const userFind = snapshot.docs.find((doc) => doc.data()['nickname'] === this.nickname && doc.data()['roomname'] === this.roomname)

      const upd = this.db.doc(`roomusers/${userFind?.id}`)
      upd.update({ status: 'offline' })
        .catch((error) => console.log('Error updating user:', error));

    })

    this.router.navigate(['/roomlist']);
  }

}