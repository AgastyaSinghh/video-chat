import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomIdService {

  constructor(
    private http: HttpClient
  ) { 
    console.info("Room id called")
  }

  private sendCreateRoomRequest(){
    
  }

  room_id: string="";

  createRoom() {
    console.log("New Room Creation Initiated")

    // const observable = new Observable( (subscriber) => {
      console.log("Creation Request sent")
      var url = "http://localhost:3000/newRoom"
      this.http.post(url, undefined).subscribe( response => {
        console.log(response)
        var id:string = getId(response)
        this.room_id = id;
        console.log(id)
        return id;
        // subscriber.next(id)
        // subscriber.complete()
      })
    // })

    // observable.subscribe( (id)=> {
    //   console.log(id)
    // })
    // this.sendCreateRoomRequest()
  }

  joinRoom(){}

  getRoomId(){
    // if(this.room_id === "") {
    //   this.createRoom().then( () => {
    //     return this.room_id;
    //   })
    // }
    // else 
    return this.room_id;
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
