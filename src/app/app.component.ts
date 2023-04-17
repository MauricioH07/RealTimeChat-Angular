import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { environment } from 'src/environments/environment';

const firebaseConfig = {
  apiKey: "AIzaSyBV8VcRO1HmsDQD-o_zStzf8JgIFm2roeQ",
  authDomain: "softcode-dev.firebaseapp.com",
  databaseURL: "https://softcode-dev-default-rtdb.firebaseio.com",
  projectId: "softcode-dev",
  storageBucket: "softcode-dev.appspot.com",
  messagingSenderId: "934030730001",
  appId: "1:934030730001:web:a2c6cb5f611391aac262b0",
  measurementId: "G-26JX14SKPX"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-firebase';

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}
