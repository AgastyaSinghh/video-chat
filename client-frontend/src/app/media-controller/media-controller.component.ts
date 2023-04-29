import { Component } from '@angular/core';
import { MediaControllerService } from '../services/media-controller.service';
import { WebRtcService } from '../services/web-rtc.service';
import { HtmlParser } from '@angular/compiler';
import { DrawerServiceService } from '../services/drawer-service.service';

@Component({
  selector: 'app-media-controller',
  templateUrl: './media-controller.component.html',
  styleUrls: ['./media-controller.component.css']
})
export class MediaControllerComponent {

  deviceList: MediaDeviceInfo[]=[]
  cameraList: MediaDeviceInfo[]=[]
  speakerList: MediaDeviceInfo[]=[]
  micList: MediaDeviceInfo[]=[]
  micEnabled: boolean = true
  cameraEnabled: boolean = true

  // var myModal = document.getElementById('myModal')
  // var myInput = document.getElementById('myInput')
  
  // myModal.addEventListener('shown.bs.modal', function () {
  //   myInput.focus()
  // })

  constructor(
    private webRtcService: WebRtcService,
    private mediaControllerService: MediaControllerService,
    private drawerService: DrawerServiceService,
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
      console.log(devices)
    })
    .catch((err) => {
      alert("Failed to fetch all media devices!")
      console.error(`${err.name}: ${err.message}`);
      this.deviceList = []
      this.updateCameraAndMic()
    });

  }

  toggleChat(){
    this.drawerService.toggle('ChatBox')
  }
  toggleInfo(){
    this.drawerService.toggle('MeetingInfo')
  }
  toggleParticipantInfo(){
    this.drawerService.toggle('ParticipantInfo')
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
    
    // var oldId = ""
    
    var newDeviceId = eventTarget.value
    // console.log("Old:", oldId)
    // console.log("New", newDeviceId)


    

    this.mediaControllerService.changeTrackOld(inputType, newDeviceId)
    // this.webRtcService.changeTrack(inputType, newDeviceId)
    console.log("Reconnection fired")
    this.webRtcService.reconnect()
    

  }

  
}
