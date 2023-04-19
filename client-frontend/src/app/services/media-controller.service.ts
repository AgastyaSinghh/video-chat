import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaControllerService {
  // static getMyMediaStream() {
  //   throw new Error('Method not implemented.');
  // }
   
  static myStream:MediaStream | null = null
  deviceList: [] = [];
  
  static micID:string = ""
  static cameraID:string = ""

  static mediaConstraints = {
    audio: true,
    video: {
      width: {exact: 320}, 
      height: {exact: 240}, 
      frameRate: {exact: 10},
      // deviceId: { exact: "" }
    }
  };
  

  constructor() {}

  static async getMyMediaStream():Promise<MediaStream>{
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

  static toggleMic(){
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
  
  static toggleCamera(){
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

  static getDeviceList(): Promise<MediaDeviceInfo[]>{

    // fetchDeviceListFromNavigator().then(deviceList)
    if (!navigator.mediaDevices?.enumerateDevices) {
      alert("enumerateDevices() not supported.");
      console.log("enumerateDevices() not supported.");
      // return undefined
    } return navigator.mediaDevices.enumerateDevices();
  }

  static changeTrackOld(inputType: string, newTrackId: string){

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
      })
      console.log('Track added')
    });
  }
}
