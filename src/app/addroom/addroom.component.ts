import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css']
})
export class AddroomComponent implements OnInit {

  roomForm!: FormGroup;
  nickname = '';
  roomname = '';
  // ref = firebase.database().ref('rooms/');
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private fbs: FirebaseService) {
  }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      'roomname': [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {

    const room = form;
    const db = firebase.firestore();
    const collection = db.collection('rooms/')
    collection.get().then((querySnapshot) => {

      console.log('Log')
      console.log(querySnapshot.size)
      console.log(querySnapshot)


      if (querySnapshot.size == 0) {
        this.fbs.saveDataFirebase(room, '/rooms');
        this.router.navigate(['/roomlist']);

      } else {
        
        querySnapshot.forEach((snapshot) => {
          console.log('Aqui dice')
          console.log(snapshot.data()['roomname'])
          console.log('Aqui dice2')
          console.log(room.roomname)
          if (snapshot.data()['roomname'] == room.roomname) {
            this.snackBar.open('Room name already exist!');
          } else {
            this.fbs.saveDataFirebase(room, '/rooms');
            this.router.navigate(['/roomlist']);
          }

        });
      }
    });

  }
}
