import { Component, EventEmitter, Output } from '@angular/core';
import { EmojisService } from 'src/app/services/emojis.service';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.css']

})
export class EmojisComponent {

  constructor(private emojiServ: EmojisService) { }

  @Output() emojiSelection = new EventEmitter<string[]>();

  sections = {
    search: 'Buscar',
    recent: 'Recientes',
    smileys: 'Emojis y personas',
    nature: 'Animales y naturaleza',
    foods: 'Comida y bebida',
    activity: 'Actividades',
    places: 'Viajes y lugares',
    objects: 'Objetos',
    symbols: 'Símbolos',
    flags: 'Banderas'
  };
  emojis: string[] = [];

  addEmoji(emoji: string | any) {
    this.emojis.push(emoji.emoji.native)
    this.emojiSelection.emit(this.emojis)

    // this.emojis.splice(0, this.emojis.length)
  }
}
