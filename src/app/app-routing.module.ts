import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { LoginComponent } from './login/login.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { LiveRoomComponent } from './pages/live-room/live-room.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'roomlist', component: RoomlistComponent},
  // {path: 'roomlist', component: LiveRoomComponent},
  {path: 'addroom', component: AddroomComponent},
  {path: 'chatroom/:roomname', component: ChatroomComponent},
  {path: '',
    redirectTo:'/login',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
