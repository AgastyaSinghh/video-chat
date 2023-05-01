import { Component, Injectable } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class  VideoGridComponent {

  static count:number = 0;

  
  constructor(){
    // console.log("video grid constructior called", count)
    // VideoGridComponent.count += 1
    // this.videoGridElement = document.getElementById('video-grid')
  }


  addVideoStream(video: HTMLVideoElement, stream: MediaStream) {


    var videoGridElement = document.getElementById('video-grid');

    if(video == null) {
      console.error("Video is null")
      return
    }

    video.style.margin = "10px"
    video.style.borderRadius = "10px"
    video.style.width = "100%"
    // video.style.height = "100%"

    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    video.classList.add('video-element')
    
    if(videoGridElement == null) console.log("Video grid element not intitialized")
    else videoGridElement.append(video)
    console.log("Added video")
  }

}
