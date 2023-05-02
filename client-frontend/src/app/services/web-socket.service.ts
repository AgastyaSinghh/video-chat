import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  
  socket: any
  readonly uri:string = "http://localhost:3000"

  constructor() {
    //pass in the url to create the socket connections

    this.socket = io(this.uri)

  }


  listen(eventName: String){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data)

      })
    })
  }


  emit(eventName: String, data: any){
    this.socket.emit(eventName, data)
  }
  
  emit3(eventName: String, data1: any, data2: any, data3: any){
    this.socket.emit(eventName, data1, data2, data3)
  }

}
