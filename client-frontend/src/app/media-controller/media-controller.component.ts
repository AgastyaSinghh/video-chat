import { Component, Input } from '@angular/core';
import { MediaControllerService } from '../services/media-controller.service';
import { WebRtcService } from '../services/web-rtc.service';
import { DrawerServiceService } from '../services/drawer-service.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeviceChangeModalComponent } from './device-change-modal/device-change-modal.component';
import { Participant } from 'src/models/Participant';
import { RoomIdService } from '../services/room-id.service';
import { RoomService } from '../services/room.service';


@Component({
  selector: 'app-media-controller',
  templateUrl: './media-controller.component.html',
  styleUrls: ['./media-controller.component.css']
})
export class MediaControllerComponent {

  @Input() participantList !:Participant[];

  micEnabled: boolean = true
  cameraEnabled: boolean = true
  isScreenShared: boolean = false
  isHost: boolean = false

  constructor(
    private webRtcService: WebRtcService,
    private mediaControllerService: MediaControllerService,
    private drawerService: DrawerServiceService,
    public dialog: MatDialog,
  ) { 
    this.isHost = RoomService.isThisHost()
   }

  toggleCamera() {
    this.cameraEnabled = !this.cameraEnabled
    this.mediaControllerService.toggleCamera()
  }

  toggleMic() {
    this.micEnabled = !this.micEnabled
    this.mediaControllerService.toggleMic()
  }

  toggleChat() {
    this.drawerService.toggle('ChatBox')
  }

  toggleInfo() {
    this.drawerService.toggle('MeetingInfo')
  }

  toggleLogs(){
    this.drawerService.toggle('MeetingLogs')
  }

  toggleParticipantInfo() {
    this.drawerService.toggle('ParticipantInfo')
  }

  startScreenShare(){
    if(this.isScreenShared === true) return
    this.mediaControllerService.shareScreen()
  }


  changeMedia(eventTarget: any, inputType: string) {
    console.log(eventTarget)

    if (eventTarget == null) return

    var newDeviceId = eventTarget.value

    this.mediaControllerService.changeTrackOld(inputType, newDeviceId)

    // this.webRtcService.changeTrack(inputType, newDeviceId)
    console.log("Reconnection fired")
    this.webRtcService.reconnect()


  }

  openDialog(): void {

    const dialogRef = this.dialog.open(DeviceChangeModalComponent)

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });


  }
}

