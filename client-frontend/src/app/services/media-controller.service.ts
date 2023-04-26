import { Injectable, OnInit } from '@angular/core';
import { WebRtcService } from './web-rtc.service';
// import { WebRtcService } from './web-rtc.service';

@Injectable({
  providedIn: 'root'
})
export class MediaControllerService {
  // static getMyMediaStream() {
  //   throw new Error('Method not implemented.');
  // }
   
  myStream:MediaStream | null = null
  deviceList: [] = [];
  
  micID:string = ""
  cameraID:string = ""

  mediaConstraints = {
    audio: true,
    video: {
      width: {exact: 426}, 
      height: {exact: 240}, 
      frameRate: {exact: 10},
      // deviceId: { exact: "" }
    }
  };
  
  // webRtcService: WebRtcService

  constructor(
    private webRtcService: WebRtcService,
  ) {}

  async getMyMediaStream():Promise<MediaStream>{
    if (this.myStream == null){
      // var newConstraints = this.mediaConstraints
      // if(newConstraints.video.deviceId.exact == ""){
      //   delete newConstraints?.video?.deviceId
      // }
      this.myStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints)
      console.log('New Media Stream Created')
      this.myStream.getTracks().forEach(track => {
        if(track.kind == 'audio') this.micID = track.id
        if(track.kind == 'video') this.cameraID = track.id
      });
      return this.myStream
    } else return this.myStream;
  }

  toggleMic(){
    console.log("Flip mic triggered")
    this.getMyMediaStream().then(stream => {
        var myStreamTrack = stream.getTracks()
        myStreamTrack.forEach(track => {
            if(track.kind == 'audio'){
                if(track.enabled == false) {
                  // track.stop()
                  track.enabled = true
                }
                else track.enabled = false
            }
        });
    })
  }
  
  toggleCamera(){
    console.log("Flip camera triggered")
    this.getMyMediaStream().then(stream => {
        var myStreamTrack = stream.getTracks()
        myStreamTrack.forEach(track => {
            if(track.kind == 'video'){
                if(track.enabled == false) {
                  // track.stop()
                  track.enabled = true
                }
                else track.enabled = false
            }
        });
    })
    
  }

  getDeviceList(): Promise<MediaDeviceInfo[]>{

    // fetchDeviceListFromNavigator().then(deviceList)
    if (!navigator.mediaDevices?.enumerateDevices) {
      alert("enumerateDevices() not supported.");
      console.log("enumerateDevices() not supported.");
      // return undefined
    } return navigator.mediaDevices.enumerateDevices();
  }

  changeTrackOld(inputType: string, newTrackId: string){

    if(inputType == 'audioinput') 
      this.myStream?.getAudioTracks().forEach(track => {
        this.myStream?.removeTrack(track)
      });
    else if(inputType == 'videoinput')
      this.myStream?.getVideoTracks().forEach(track => {
        this.myStream?.removeTrack(track)
      });
    
      var newConstraints = this.mediaConstraints;


      (newConstraints.video as any).deviceId  = {exact: newTrackId}
      // this.mediaConstraints.video.deviceId
      console.log(newConstraints)
    navigator.mediaDevices.getUserMedia(newConstraints).then((newStream) => {
      newStream.getTracks().forEach( track => {
        this.myStream?.addTrack(track)
        console.log("meadia contriller service-> new track track")
        // this.webRtcService.replaceTrack(inputType, track)
        this.webRtcService.replaceTrack(inputType, track)
      })
      console.log('Track added')
    });
  }
}
