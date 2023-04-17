import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { environment } from 'src/environments/environment';

const firebaseConfig = {
  apiKey: "AIzaSyAwRJvVNBwz8oePAusIjgT6Rc8W3d44BqM",
  authDomain: "softcode-7a4bc.firebaseapp.com",
  projectId: "softcode-7a4bc",
  storageBucket: "softcode-7a4bc.appspot.com",
  messagingSenderId: "593486619974",
  appId: "1:593486619974:web:7405fddbc9f55da8b4f147",
  measurementId: "G-QST249H6BJ"
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
