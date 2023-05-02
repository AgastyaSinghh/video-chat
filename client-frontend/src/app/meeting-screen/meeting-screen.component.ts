import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaControllerService } from '../services/media-controller.service';
import { WebSocketService } from '../services/web-socket.service';
import { RoomService } from '../services/room.service';
import { Peer, PeerJSOption } from "peerjs";
import { WebRtcService } from '../services/web-rtc.service';
// import { WebRtcService } from './web-rtc.service';
import { VideoGridComponent } from '../video-grid/video-grid.component';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { DrawerServiceService } from '../services/drawer-service.service';

type Message = {sender: string, message: string}

@Component({
  selector: 'app-meeting-screen',
  templateUrl: './meeting-screen.component.html',
  styleUrls: ['./meeting-screen.component.css']
})
export class MeetingScreenComponent implements OnInit{
  @ViewChild('drawer') drawerElement!: MatDrawer;

  showFiller = false;
  // displayItem: Object = "GGG"
  sidebarDrawer: {displayItem: string} = {
    displayItem: ""
  }

  USER_NAME: string = ""
  participantElement: any;
  videoGridElement: any;
  chatBoxElement: any;

  room_id: string = "";

  MY_PEER_ID:string = ""
  
  messageList: Message[] = []
  participantList :string[]= ["You"]
  // peerList:Map<string, any> = new Map<string, any>()

  // peerServerAddress:PeerJSOption = {
  //   host: '/',
  //   port: 3001
  // }

  // myPeer:any = undefined

  constructor(
    private webSocketService: WebSocketService,
    private webRtcService: WebRtcService,
    private videoGridComponent: VideoGridComponent,
    // private roomService: RoomService
    private mediaControllerService: MediaControllerService,

    private drawerService: DrawerServiceService
  ){}

  ngOnInit(){

    
    this.webRtcService.createPeer()
    this.room_id = RoomService.getRoomID()

    this.participantElement = document.getElementById('participants')
    this.videoGridElement = document.getElementById('video-grid')
    this.chatBoxElement = document.getElementById('div-chat-main')
    
    this.startSocketListeners();
    this.startCallListeners();


    // var myVideo = document.createElement('video').setAttribute('id', 'my-video')
    var myVideo:HTMLVideoElement = document.createElement('video')
  
    myVideo.muted = true
    console.log("video is on")
  

    this.mediaControllerService.getMyMediaStream().then(my_stream => {
      this.videoGridComponent.addVideoStream(myVideo, my_stream)
      console.log("Peer ID", this.MY_PEER_ID)
      
      this.webSocketService.listen('user-connected').subscribe((newUserId) => {
          if(typeof newUserId == 'string') 
            this.connectToNewUser(newUserId)
          else 
            alert("faliure with listen.('user-connected') newUserId is not string")
      })

    })
      
      
  }

  ngAfterViewInit(){
    this.drawerService.setDrawer(this.drawerElement)
    this.drawerService.setSidebarDrawer(this.sidebarDrawer)
  //   console.log('Drawere loaded')
  }


  // toggleDrawer(){
  //   // this.drawerElement.toggle()
  //   this.drawerService.toggle()
  // }

  startSocketListeners(){
    this.webSocketService.listen('receive').subscribe( msg => {
      console.log("Msg received: ", msg)
      if(typeof msg === 'string') 
      this.messageList.push({sender: "", message: msg})
    })
    

    this.webSocketService.listen('user-disconnected').subscribe( (userId) =>{
      
      if(typeof userId == 'string') {
        this.webRtcService.closePeerConnection(userId)
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
    if(msg == "") 
      return
    console.log("Message: ", messageElement.value)
    messageElement.value = ""
    this.webSocketService.emit('send-msg', msg)
    this.messageList.push({sender: "You", message: msg})
    // this.chatBoxElement.innerHTML += msg + "<br></br>"
  }

  removeParticipant(userId: string) {    
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
    
    this.webRtcService.listen('open').subscribe((user_id: any) => {
      this.MY_PEER_ID = user_id;
      console.log("My ID is: ", this.MY_PEER_ID)
      var ele = document.getElementById("peer-id-field")
      if(ele) ele.innerText += this.MY_PEER_ID
      this.webSocketService.emit2('join-room', this.room_id, this.MY_PEER_ID)
      // socket.emit('join-room', ROOM_ID, MY_PEER_ID)
    })
    
    this.webRtcService.listen('call').subscribe((mediaConnection: any) => {
    
      this.mediaControllerService.getMyMediaStream().then(my_stream => {
        mediaConnection.answer(my_stream)
        var peer_id = mediaConnection.peer
        const peerVideoElement = document.createElement('video')
        peerVideoElement.id = 'video-' + peer_id;
        this.addParticipant(peer_id)
        mediaConnection.on('stream', (peerUserVideoStream: any) => {
          //adds in naya wala
          this.videoGridComponent.addVideoStream(peerVideoElement, peerUserVideoStream)
        })
      })
    })
    

  
  }

  closeSidebar(){
    this.drawerService.close()
  }

  copyRoomDetails(){
    navigator.clipboard.writeText(this.room_id)
  }

  connectToNewUser(peerId: string) {
    this.mediaControllerService.getMyMediaStream().then(stream => {
      // const call = this.myPeer.call(peerId, stream)
      this.webRtcService.call(peerId, stream)
      
      this.addParticipant(peerId)
      // this.peerList.set(peerId, call) = call
      // this.peerList.set(peerId, call)
  
      // call.on('stream', (remoteStream:any) => {
      //   this.addVideoStream(peerVideoElement, remoteStream)
      // })
  
    })
    
  }

  toggleSideNav(){
    // var drawer = document.getElementById('drawer') as MatDrawer
    // drawer.toggle()
    // this.drawer.toggle()
  }

  
}


