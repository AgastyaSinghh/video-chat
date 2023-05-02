import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { MeetingScreenComponent } from './meeting-screen/meeting-screen.component';
import { RoomIdService } from '../app/services/room-id.service';
import { WebRtcService } from './services/web-rtc.service';
import { MediaControllerComponent} from './media-controller/media-controller.component';
import { VideoGridComponent } from './video-grid/video-grid.component';
import { LoginScreenMediaControllerComponent } from './login-screen-media-controller/login-screen-media-controller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { DeviceChangeModalComponent } from './media-controller/device-change-modal/device-change-modal.component';
import { Participant } from 'src/models/Participant';
import { Logs } from 'src/models/Logs'
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    MeetingScreenComponent,
    MediaControllerComponent,
    VideoGridComponent,
    LoginScreenMediaControllerComponent,
    DeviceChangeModalComponent
  ],
  imports: [
    MatTooltipModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule 
  ],
  providers: [RoomIdService, WebRtcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
