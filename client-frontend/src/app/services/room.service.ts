import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  static room_id: string = ""
  constructor() { }

  static setRoomID(id: string): void{
    this.room_id = id;
  }
  
  static getRoomID(): string{
    return this.room_id;
  }
}
