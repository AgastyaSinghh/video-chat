import { Component } from '@angular/core';
import { WebRtcService } from '../services/web-rtc.service';
import { MediaControllerService } from '../services/media-controller.service';

@Component({
  selector: 'app-login-screen-media-controller',
  templateUrl: './login-screen-media-controller.component.html',
  styleUrls: ['./login-screen-media-controller.component.css']
})
export class LoginScreenMediaControllerComponent {
  deviceList: MediaDeviceInfo[]=[]
  cameraList: MediaDeviceInfo[]=[]
  speakerList: MediaDeviceInfo[]=[]
  micList: MediaDeviceInfo[]=[]
  micEnabled: boolean = true
  cameraEnabled: boolean = true

  constructor(
    // private webRtcService: WebRtcService,
    private mediaControllerService: MediaControllerService,
  ){}

  toggleCamera(){
    this.cameraEnabled = !this.cameraEnabled
    this.mediaControllerService.toggleCamera()
  }
  
  toggleMic(){
    this.micEnabled = !this.micEnabled
    this.mediaControllerService.toggleMic()
  }

  displayMediaDevices() {
    // this.deviceList = 
    this.mediaControllerService.getDeviceList()
    .then((devices: any) => {
      this.deviceList = devices;
      this.updateCameraAndMic()
    })
    .catch((err) => {
      alert("Failed to fetch all media devices!")
      console.error(`${err.name}: ${err.message}`);
      this.deviceList = []
      this.updateCameraAndMic()
    });

  }

  updateCameraAndMic(){
    this.cameraList = []
    this.micList = []
    this.speakerList = []

    this.deviceList.forEach(device => {
      if(device.kind == "videoinput")
        this.cameraList.push(device)
      if(device.kind == "audioinput")
        this.micList.push(device)
      if(device.kind == "audiooutput")
        this.speakerList.push(device)
    });
  }

  changeMedia(eventTarget: any, inputType: string){
    console.log(eventTarget)
    if(eventTarget == null) return
    var newDeviceId = eventTarget.value
    this.mediaControllerService.changeTrackOld(inputType, newDeviceId)
  }
}
