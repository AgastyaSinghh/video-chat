import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingScreenComponent } from './meeting-screen/meeting-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  {path: "", component: LoginScreenComponent},
  {path: "meeting", component: MeetingScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
