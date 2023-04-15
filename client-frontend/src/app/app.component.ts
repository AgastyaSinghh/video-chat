import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client-frontend';

  constructor(
    // private webSocketService: WebSocketService
    private router: Router
    ){}

  ngOnInit() {
    //here we want to connect to socket.io server


    //listen to an event from socket.io server
    // this.webSocketService.listen('test-event').subscribe( (data) => {
    //   console.log("Output from test-event", data)
    // })

    this.router.navigateByUrl('')

  }
}
