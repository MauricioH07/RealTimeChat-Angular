import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { map, switchMap } from 'rxjs';
import { Message } from 'src/app/models/message';
import { Chat } from 'src/app/models/chat';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmojisService } from '../services/emojis.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataComponent } from '../components/user-data/user-data.component';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface DialogData {
  animal: string;
  name: string;
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
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent implements OnInit {

  chatForm = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  chatList: any;


  @ViewChild('chatcontent') chatcontent: ElementRef | any;
  @ViewChild('chatPanel') chatPanel: ElementRef | any;

  selectedOptionTime: string = "";
  selectedOptionStatus: string = "";
  selectedFile: any = File;
  imagePast = false;
  pasteImageSrc: string = '';
  showSearch = false;
  search = false;
  emojis: string[] = [];
  palabraBuscada: string = "";
  scrolltop?: number | null;
  showEmojiPicker = false;
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
  selectedEmoji: any;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private fbs: FirebaseService,
    private db: AngularFirestore,
    private elementRef: ElementRef,
    public dialog: MatDialog,
    ) {

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

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDataComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
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

  // Abrimos el buscador de palabras
  openSearch() {
    this.search = true
    this.showSearch = true;
  }

  // Buscamos una palabra en el chat
  buscarPalabra() {
    
    this.chats.forEach(message => {
 
      if ("message" in message) {
        
        if (message.message.indexOf(this.palabraBuscada) !== -1) {
          
          console.log("La palabra buscada es: ", message.message);
          this.scrollElementIntoView();
        }
      }
      // message.word = message.message.toLowerCase
    })
  }

  // Direccionamos la palabra encontrada a el mensaje mediante scrollIntoView
  scrollElementIntoView(){
    const mensajeEncontrado = this.chats.find(message => message.word);

    if(mensajeEncontrado && this.chatPanel && this.chatPanel.nativeElement){
      mensajeEncontrado.word = true;
      this.chatPanel.nativeElement.scrollIntoView({ behavior: 'smooth',block: 'center'})
    }
  }



  // Cerramos el buscador de palabra
  closeSearch() {
    this.search = false
    this.showSearch = false
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

        this.urlImage = 'image'
        chat.nickname = this.nickname;
        chat.urlImage = 'image'

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
    this.scrollToBottom();
    this.emojis.splice(0, this.emojis.length)

  }

  // Metodo para que al mandar mensaje el scroll se vaya hasta abajo 
  scrollToBottom() {
    console.log("Scroll TOP")
    console.log(this.chatcontent.nativeElement.scrollTop)
    this.chatcontent.nativeElement.scrollTop = this.chatcontent.nativeElement.scrollHeight;
    console.log("Scroll HTIG")
    console.log(this.chatcontent.nativeElement.scrollTop)
  }

  // **** Visualizar emojis en input ****
  handleEmojiClick(emojis: string[] | any) {
    this.emojis = emojis
  }

  showEmoji() {
    this.showEmojiPicker = true;
  }

  pasteHtmlAtCaret(html: any) {
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
        while ((node = el.firstChild)) {
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

  handleImagePaste(event: any): void {

    const items = event.clipboardData.items

    for (let i = 0; i < items.length; i++) {

      const item = items[i]

      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();

        // Mostramos la imagen pegada en el chat
        this.showPastedImage(file)
      }
    }

  }

  showPastedImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: any) => {

      console.log(event.target.result)
      this.pasteImageSrc = event.target.result;
      this.imagePast = true;
      this.sendImage(file)
    };


    reader.readAsDataURL(file);
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

  closeEmoji() {
    return this.showEmojiPicker = false
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

    if(event.target.files[0].name.includes(".png") || event.target.files[0].name.includes(".jpg") ){

      console.log('txt', event.target.files[0]);
      
      
      this.fbs.uploadImage(event.target.files[0])
      .then(async (response) => {
        console.log("Aqui1")
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

    }else{
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fbs.uploadImage(this.selectedFile)
      .then(async (response) => {
        let url = await response.ref.getDownloadURL()
        const data: Chat = {
          id: now.getTime().toString(),
          // message: txt,
          file: this.selectedFile,
          date: moment(now).format('YYYY-MM-DD h:mm:ss'),
        }
        
        this.fbs.saveDataFirebase(data, '/chats');
      });

    }
      
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

  statuSelection(option:string){
    
    switch(option){
      case "red":
        this.selectedOptionStatus = "../../assets/images/redCircle.png";
        break;
      case "yellow":
        this.selectedOptionStatus = "../../assets/images/yellowCircle.png";
        break;
      case "green":
        this.selectedOptionStatus = "../../assets/images/CircleGreen.png";
        break;
      case "white":
        this.selectedOptionStatus = "../../assets/images/whiteCircle.png";
        break;
      case "whiteX":
        this.selectedOptionStatus = "../../assets/images/whiteCross_circle.png";
        break;
      case "redE":
        this.selectedOptionStatus = "../../assets/images/redE_circle.png";
        break;
      case "yellowE":
        this.selectedOptionStatus = "../../assets/images/yellowE_circle.png";
        break;
      case "greenE":
        this.selectedOptionStatus = "../../assets/images/greenE_Circle.png";
        break;
      case "whiteE":
        this.selectedOptionStatus = "../../assets/images/whiteE_circle.png";
        break;
      case "whiteEX":
        this.selectedOptionStatus = "../../assets/images/whiteE_cross_circle.png";
        break;
    }

  }

  timeSelection(option:string){

    switch(option){

      case "time":
        this.selectedOptionTime = "../../assets/images/timeWhite.png";
        break;
      case "timeTravel":
        this.selectedOptionTime = "../../assets/images/timeTravelWhite.png";
        break;

    }

  }

  openUserData(){
    const dialogRef: MatDialogRef<UserDataComponent> = this.dialog.open(UserDataComponent,{
      width: '800px',

    });

    dialogRef.afterClosed().subscribe(result => {
      // Aqui podemos hacer alguna accion cuando el modal se cierre
    })
  }


  // Salida de la sala de chat
  // exitChat() {
  //   const now = new Date();
  //   const chat: Message = {
  //     roomname: this.roomname,
  //     nickname: this.nickname,
  //     message: `${this.nickname} leave the room`,
  //     date: moment(now).format('YYYY-MM-DD h:mm:ss'),
  //     type: 'exit'
  //   };

  //   chat.roomname = this.roomname;
  //   chat.nickname = this.nickname;
  //   chat.date = moment(now).format('YYYY-MM-DD h:mm:ss');
  //   chat.message = `${this.nickname} leave the room`;
  //   chat.type = 'exit';
  //   // Guardamos el mensaje de salida en la BD
  //   this.fbs.saveDataFirebase(chat, '/chats')

  //   // Actualizamos el status cuando el usuario sale del chat
  //   const db = firebase.firestore();
  //   const collection = db.collection('roomusers/')
  //   collection.get().then((snapshot) => {
  //     const userFind = snapshot.docs.find((doc) => doc.data()['nickname'] === this.nickname && doc.data()['roomname'] === this.roomname)

  //     const upd = this.db.doc(`roomusers/${userFind?.id}`)
  //     upd.update({ status: 'offline' })
  //       .catch((error) => console.log('Error updating user:', error));

  //   })

  //   this.router.navigate(['/roomlist']);
  // }
}




