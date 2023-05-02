export class Logs  {
    user: string;
    time: string;
    content: string;
  
    constructor(user: string, content: string){
      this.user = user
      this.time = new Date().toLocaleTimeString();
      this.content = content
    }
  
  }