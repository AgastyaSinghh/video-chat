import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { MeetingScreenComponent } from './meeting-screen/meeting-screen.component';
import { RoomIdService } from '../app/services/room-id.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    MeetingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [RoomIdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
