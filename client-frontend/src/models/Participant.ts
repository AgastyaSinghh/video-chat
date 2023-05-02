export class Participant  {
    name: string;
    peer_id: string;
  
    constructor(){
      this.name = ""
      this.peer_id = ""
    }
  
    setName(username: string){
      this.name = username
    }
    
    setPeerId(peerid: string){
      this.peer_id = peerid
    }
  
    setByObject(obj: any){
      this.name = obj.sender
      this.peer_id = obj.content
    }
  }