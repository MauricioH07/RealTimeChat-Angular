import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { environment } from 'src/environment/environment';
import { environment } from '../environments/environment';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { RoomlistComponent } from './roomlist/roomlist.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DatePipe } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { LiveRoomComponent } from './pages/live-room/live-room.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji'
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SingleLayoutComponent } from './single-layout/single-layout.component';
import { EmojisComponent } from './components/emojis/emojis.component';
import { TableHomeComponent } from './home/table-home/table-home.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardriveComponent } from './components/cardrive/cardrive.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HotelComponent } from './components/hotel/hotel.component';
import { BusComponent } from './components/bus/bus.component';
import { CarComponent } from './components/car/car.component';
import { FligthComponent } from './components/fligth/fligth.component';
import { TrainComponent } from './components/train/train.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserDataComponent } from './components/user-data/user-data.component';
import { MatDialogModule } from '@angular/material/dialog';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // RoomlistComponent,
    AddroomComponent,
    ChatroomComponent,
    MessageComponent,
    LiveRoomComponent,
    SingleLayoutComponent,
    EmojisComponent,
    TableHomeComponent,
    CardriveComponent,
    HotelComponent,
    BusComponent,
    CarComponent,
    FligthComponent,
    TrainComponent,
    UserDataComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxDropzoneModule,
    EmojiModule,
    PickerModule,
    HttpClientModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
