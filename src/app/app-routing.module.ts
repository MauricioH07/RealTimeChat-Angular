import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { LoginComponent } from './login/login.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SingleLayoutComponent } from './single-layout/single-layout.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'roomlist', component: RoomlistComponent},
  {path: 'single-layout', component: SingleLayoutComponent},
  {path: 'addroom', component: AddroomComponent},
  {path: 'chatroom/:roomname', component: ChatroomComponent},
  {path: '',
    redirectTo:'/single-layout',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
