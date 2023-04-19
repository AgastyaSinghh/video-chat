import { Component } from '@angular/core';
import { MediaControllerService } from '../services/media-controller.service';

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

  toggleCamera(){
    this.cameraEnabled = !this.cameraEnabled
    MediaControllerService.toggleCamera()
  }
  
  toggleMic(){
    this.micEnabled = !this.micEnabled
    MediaControllerService.toggleMic()
  }

  displayMediaDevices() {
    // this.deviceList = 
    MediaControllerService.getDeviceList()
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
    
    // var oldId = ""
    
    var newDeviceId = eventTarget.value
    // console.log("Old:", oldId)
    // console.log("New", newDeviceId)

    
    

    // MediaControllerService.changeTrack(inputType, newDeviceId)


  }

  
}
