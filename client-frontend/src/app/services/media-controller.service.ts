import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaControllerService {
  // static getMyMediaStream() {
  //   throw new Error('Method not implemented.');
  // }
   
  static myStream:MediaStream | null = null

  static mediaConstraints = {
    audio: true,
    video: {width: {exact: 320}, height: {exact: 240}, frameRate: {exact: 10}}
  };
  

  constructor() {}

  static async getMyMediaStream():Promise<MediaStream>{
    if (this.myStream == null){
      this.myStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints)
      console.log('New Media Stream Created')
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
}
