import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  static room_id: string = ""
  static user_name: string = "John"
  static isHost: boolean = false
  constructor() { }

  static setRoomID(id: string): void{
    this.room_id = id;
  }

  static makeHost(){
    this.isHost = true
  }
  
  static isThisHost(): boolean{
    return this.isHost
  }
  
  static getRoomID(): string{
    return this.room_id;
  }
  
  static setUserName(username: string): void{
    this.user_name = username;
  }
  
  static getUserName(): string{
    return this.user_name;
  }
}
