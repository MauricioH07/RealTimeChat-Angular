import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { environment } from 'src/environments/environment';

const firebaseConfig = {
  apiKey: "AIzaSyDFQkk0ikYKzkTsBcINXqI_wlF6BhI0e3E",
  authDomain: "softcode-3d663.firebaseapp.com",
  databaseURL:"https://softcode-3d663-default-rtdb.firebaseio.com",
  projectId: "softcode-3d663",
  storageBucket: "softcode-3d663.appspot.com",
  messagingSenderId: "450151373178",
  appId: "1:450151373178:web:57463feb34a8642264dec3",
  measurementId: "G-79K1LLH63W"
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
    firebase.initializeApp(environment.firebase);
  }
}
