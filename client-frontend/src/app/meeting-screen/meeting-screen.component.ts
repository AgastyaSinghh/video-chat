import { Component, OnInit } from '@angular/core';
import { MediaControllerService } from '../services/media-controller.service';
import { WebSocketService } from '../services/web-socket.service';
import { RoomService } from '../services/room.service';
import { Peer, PeerJSOption } from "peerjs";


@Component({
  selector: 'app-meeting-screen',
  templateUrl: './meeting-screen.component.html',
  styleUrls: ['./meeting-screen.component.css']
})
export class MeetingScreenComponent implements OnInit{

  micEnabled: boolean = true
  cameraEnabled: boolean = true
  
  participantElement: any;
  videoGridElement: any;
  chatBoxElement: any;

  room_id: string = "";

  MY_PEER_ID:string = ""
  participantList :string[]= []
  peerList:Map<string, any> = new Map<string, any>()

  peerServerAddress:PeerJSOption = {
    host: '/',
    port: 3001
  }

  myPeer:any = undefined

  constructor(
    private webSocketService: WebSocketService,
    // private roomService: RoomService
    // private mediaControllerService: MediaControllerService
  ){}

  ngOnInit(){

    
    this.myPeer = new Peer(this.peerServerAddress)

    

    setTimeout( () => {
      this.MY_PEER_ID = this.myPeer.id
      console.log(this.myPeer.id)
      // this.addParticipant(this.MY_PEER_ID)
    }, 3000)

    this.room_id = RoomService.getRoomID()

    this.participantElement = document.getElementById('participants')
    this.videoGridElement = document.getElementById('video-grid')
    this.chatBoxElement = document.getElementById('div-chat-main')
    
    this.startListeners();

    this.startCallListeners();


    // var myVideo = document.createElement('video').setAttribute('id', 'my-video')
    const myVideo:HTMLVideoElement = document.createElement('video')
  
    myVideo.muted = true
    console.log("video is on")
  

    MediaControllerService.getMyMediaStream().then(my_stream => {
      this.addVideoStream(myVideo, my_stream)
      console.log("Peer ID", this.MY_PEER_ID)
      
      this.webSocketService.listen('user-connected').subscribe((newUserId) => {
          if(typeof newUserId == 'string') 
            this.connectToNewUser(newUserId)
          else 
            alert("faliure with listen.('user-connected') newUserId is not string")
      })

    })
      
      
  }


  addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    this.videoGridElement.append(video)
    console.log("Added video")
  }

  startListeners(){
    this.webSocketService.listen('receive').subscribe( msg => {
      this.chatBoxElement.innerHTML += msg + "<br></br>"
    })
    

    this.webSocketService.listen('user-disconnected').subscribe( (userId) =>{
      
      if(typeof userId == 'string') {
        if (this.peerList.get(userId)) 
          this.peerList.get(userId).close()
        this.removeParticipant(userId)
      }
      //remove its element
      console.log('Participant left: ', userId)
      var elementId = 'video-' + userId
      var element = document.getElementById(elementId)
      if(element != null) element.remove()
      else console.log("video element not found for |", elementId)
    })


  }

  sendMessage(){
    var messageElement = document.getElementById("input-msg") as HTMLInputElement
    var msg:string = messageElement.value
    if(msg == "") return

    messageElement.value = ""

    this.webSocketService.emit('send-msg', msg)
    
    this.chatBoxElement.innerHTML += msg + "<br></br>"
  }

  toggleCamera(){
    this.cameraEnabled = !this.cameraEnabled
    MediaControllerService.toggleCamera()
  }
  
  toggleMic(){
    this.micEnabled = !this.micEnabled
    MediaControllerService.toggleMic()
  }

  removeParticipant(userId: string) {    
    this.peerList.delete(userId)
    for( var i = 0; i < this.participantList.length; i++){ 
        // TODO check == or ===
        if ( this.participantList[i] == userId) { 
            this.participantList.splice(i, 1); 
            break;
        }
    }
    // updateList()
  }

  addParticipant(userId: string) {
    console.log("Added to participant list: ", userId)
    this.participantList.push(userId)
    console.log(this.participantList)
    // updateList()
  }

  startCallListeners(){
    
    
    this.myPeer.on('open', (user_id: any) => {
      this.MY_PEER_ID = user_id;
      console.log("My ID is: ", this.MY_PEER_ID)

      var ele = document.getElementById("peer-id-field")

      if(ele) ele.innerText += this.MY_PEER_ID

      this.webSocketService.emit2('join-room', this.room_id, this.MY_PEER_ID)
      // socket.emit('join-room', ROOM_ID, MY_PEER_ID)
    })
    
    this.myPeer.on('call', (mediaConnection: any) => {
    
      MediaControllerService.getMyMediaStream().then(my_stream => {
    
        mediaConnection.answer(my_stream)
      
        var peer_id = mediaConnection.peer
        const peerVideoElement = document.createElement('video')
        peerVideoElement.id = 'video-' + peer_id;
        this.addParticipant(peer_id)
    
    
        mediaConnection.on('stream', (peerUserVideoStream: any) => {
          this.addVideoStream(peerVideoElement, peerUserVideoStream)
        })
      })
    })
  
  }

  connectToNewUser(peerId: string) {
    MediaControllerService.getMyMediaStream().then(stream => {
      const call = this.myPeer.call(peerId, stream)
      const peerVideoElement = document.createElement('video')
      peerVideoElement.id = 'video-' + peerId;
      this.addParticipant(peerId)
      // this.peerList.set(peerId, call) = call
      this.peerList.set(peerId, call)
  
      call.on('stream', (remoteStream:any) => {
        this.addVideoStream(peerVideoElement, remoteStream)
      })
  
    })
    
  }

}



