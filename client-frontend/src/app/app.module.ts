import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { MeetingScreenComponent } from './meeting-screen/meeting-screen.component';
import { RoomIdService } from '../app/services/room-id.service';
import { WebRtcService } from './services/web-rtc.service';
import { MediaControllerComponent } from './media-controller/media-controller.component';
import { VideoGridComponent } from './video-grid/video-grid.component';
import { LoginScreenMediaControllerComponent } from './login-screen-media-controller/login-screen-media-controller.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    MeetingScreenComponent,
    MediaControllerComponent,
    VideoGridComponent,
    LoginScreenMediaControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [RoomIdService, WebRtcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
