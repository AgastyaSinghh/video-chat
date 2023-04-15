import { Component, OnInit } from '@angular/core';
import { MediaControllerService } from '../services/media-controller.service';
import { RoomIdService } from '../services/room-id.service';
import { HttpClient } from '@angular/common/http';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
// import { RoomIdService } from '../app/services/room-id.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  micEnabled: boolean = true
  cameraEnabled: boolean = true
  
  constructor(
    private roomIdService: RoomIdService,
    private http: HttpClient,
    private router:Router
  ){}

  meetingInputElement:HTMLInputElement|undefined;
  
  ngOnInit(): void {
    this.startVideo()
    this.meetingInputElement = document.getElementById('inp-text-meeting-id') as HTMLInputElement
  }

  startVideo(){
    console.log("Start Video")

    var videoElement:HTMLVideoElement = document.getElementById('video') as HTMLVideoElement
  
    MediaControllerService.getMyMediaStream().then(stream => {
      videoElement.srcObject = stream
      videoElement.addEventListener('loadedmetadata', () => {
          videoElement.play()
      })
      console.log("Added video")
    })
  }

  toggleCamera(){
    this.cameraEnabled = !this.cameraEnabled
    MediaControllerService.toggleCamera()
  }
  
  toggleMic(){
    this.micEnabled = !this.micEnabled
    MediaControllerService.toggleMic()
  }

  createMeeting(){
    //ping server to create a meeting for us
    var ROOM_ID = undefined


    console.log("New Room Creation Initiated")
    var url = "http://localhost:3000/newRoom"
    this.http.post(url, undefined).subscribe( response => {
      var id:string = getId(response)
      ROOM_ID = id;
      RoomService.setRoomID(id)
      console.log("Room Created Successfully: ", ROOM_ID)
      if(this.meetingInputElement) this.meetingInputElement.value = ROOM_ID
      // navigator.clipboard.writeText(url)
      navigator.clipboard.writeText(ROOM_ID)
      // alert(ROOM_ID)
        //     // //get address 
    //     // var url = window.location.href
    //     // url += ROOM_ID
    //     // joinMeeting(ROOM_ID)
    })
    

  
  }
  
  joinMeeting(){
    if(this.meetingInputElement) {
      var ROOM_ID = this.meetingInputElement.value
      RoomService.setRoomID(ROOM_ID)
      console.log("join meeting initianted", ROOM_ID)
      this.router.navigateByUrl('/meeting')
    }else{
      alert("meeting input element not found")
    }
    // joinMeeting(ROOM_ID)
  }
  
}


function getId(response: Object):string {

  var id: string = ""
  type Id = {id: string}
  var jsonString = JSON.stringify(response)
  console.log(typeof jsonString, jsonString)
  console.log(typeof jsonString, jsonString)
  let newObj: Id = JSON.parse(jsonString)
  console.log(newObj.id)

  id = newObj.id

  return id

  return ""
  //TODO throw error
}