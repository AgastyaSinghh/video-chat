import { Injectable } from '@angular/core';
import { Peer, PeerJSOption } from "peerjs";
import { Observable } from 'rxjs';
import { VideoGridComponent } from '../video-grid/video-grid.component';
// import { MeetingScreenComponent } from '../meeting-screen/meeting-screen.component';

@Injectable({
  providedIn: 'root'
})
export class WebRtcService{
  
  peerList:Map<string, any> = new Map<string, any>();
  peerServerAddress:PeerJSOption = {
    host: '/',
    port: 3001
  }
  MY_PEER_ID:string = ""
  myPeer:any = undefined

  constructor(
    // private meetingScreenComponent: MeetingScreenComponent,
    private videoGridComponent: VideoGridComponent
  ) { 

    console.log("webRtc constructor called")
  }


  createPeer(){
    this.myPeer = new Peer(this.peerServerAddress)
    setTimeout(() => {
      this.MY_PEER_ID = this.myPeer.id
      console.log(this.myPeer.id)
    }, 3000);
  }

  closePeerConnection(userId: string){
    if (this.peerList.get(userId)) {
      this.peerList.get(userId).close()
      console.log("--------->", "Size:", this.peerList.size)
      this.peerList.delete(userId)
    }else{
      console.error(userId, "Not found to close the connection")
    }
  }

  listen(eventName: String){
    return new Observable((subscriber) => {
      this.myPeer.on(eventName, (data: any) =>{
        subscriber.next(data)
      })
    })
  }

  call(peer_id :string, stream: MediaStream){
    let call = this.myPeer.call(peer_id, stream)
    //not working
    this.peerList.set(peer_id, call)
    
    console.log("----------------------------", this.peerList.size)
    const peerVideoElement = document.createElement('video')
    peerVideoElement.id = 'video-' + peer_id;

    call.on('stream', (remoteStream:any) => {

      // console.log("------------------------------")
      // console.log(typeof remoteStream)
      // console.log(remoteStream)

      // if(this.peerList.has(remoteStream)) return;

      // peerVideoElement.id = 'video-' + peer_id + 'webrtc-service-ts';
      console.log("added from webrtc-service-ts")
      //adds in purana wala
      this.videoGridComponent.addVideoStream(peerVideoElement, remoteStream)
      // this.meetingScreenComponent.addVideoStream(peerVideoElement, remoteStream)
      // this.addVideoStream(peerVideoElement, remoteStream)
    })
  }

  reconnect(){
    this.peerList.forEach((value: any, key: string) => {
      // value.reconnect()
      console.log(key)
      console.log(value)
    });
  }

  replaceTrack(inputType: string, newTrack: MediaStreamTrack){
    console.log("webrtc service-> replace track")
    var index: number=0;
    if(inputType == 'audioinput') index=1;
    else if(inputType == 'videoinput') index=0;
    else console.log("Invalid input")

    console.log(this.peerList.size)
    // console.log(this.peerList.entries.toString())
    // const itr = this.peerList.values()

    // console.log("++++")
    // console.log(itr.next().value)


    this.peerList.forEach(element =>{
      console.log("++++++++++++++++++++")
      console.log(element)
    })

    this.peerList.forEach((call: any, peer_id: string) => {
      // console.log(call.peerConnection.id)
      call.peerConnection.getSenders()[0].replaceTrack(newTrack)
      // console.log("Replaced for: ", peer_id)
      console.log("---------------------")
      console.log(call)
      console.log(peer_id)
    });
  }


}
