import { Injectable } from '@angular/core';
import { ChatroomComponent } from '../chatroom/chatroom.component';

@Injectable({
  providedIn: 'root'
})
export class EmojisService {

  private selectionEMoji: any;

  constructor() { }

  setValor(emoji: any) {
    // console.log("Esto es desde el setValor ")
    // console.log(emoji)
    this.selectionEMoji = emoji;
    // this.chatroom.getEmoji(this.shareEmojiValue)
  }

  getValor() {
    console.log("Esto es el valor desde el GetValue")
    console.log(this.selectionEMoji)
    return this.selectionEMoji;
  }

}
