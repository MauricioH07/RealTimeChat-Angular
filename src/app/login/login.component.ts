import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { FirebaseService } from '../services/firebase.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  nickname = '';
  // ref = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder, private fbs: FirebaseService) { }

  ngOnInit() {
    if (localStorage.getItem('nickname')) {
      this.router.navigate(['/roomlist']);
    }
    this.loginForm = this.formBuilder.group({
      'nickname' : [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const login = form;
    // let ref = firebase.database().ref('/users');

    const db = firebase.firestore();
    const collection = db.collection('users/')
    collection.get().then((querySnapshot) => {

      if(querySnapshot.size == 0){

         this.fbs.saveDataFirebase(login, '/users');;
        this.router.navigate(['/roomlist']);
      }else{

        querySnapshot.forEach((snapshot) => {
          if (snapshot.data()['nickname'] == login.nickname) {
            // const user = {
            //   name: this.nickname
            // }
            localStorage.setItem('nickname', login.nickname);
            this.router.navigate(['/roomlist']);
          }else {
            this.fbs.saveDataFirebase(login, '/users');
            localStorage.setItem('nickname', login.nickname);
            this.router.navigate(['/roomlist']);
          }
        })
      }

    })

  }

  login(){
    this.router.navigate(['/table-home']);
  }

}
