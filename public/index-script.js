// import {getMyMediaStream} from "./media-loader"
import {getMyMediaStream} from "./media-loader"

const meetingInputElement = document.getElementById('inp-text-meeting-id')
const videoElement= document.getElementById('video')

console.log("index Loaded")

getMyMediaStream().then(stream => {
    videoElement.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    console.log("Added video")
})

function createMeeting(){
    //ping server to create a meeting for us
    var ROOM_ID = //TODO

    meetingInputElement.value = ROOM_ID
    //get address 
    var url = window.location.href
    url += ROOM_ID
    navigator.clipboard.writeText(url)
    alert('Room Link: ' + url)
    // joinMeeting(ROOM_ID)
}
function joinMeeting(){
    var ROOM_ID = meetingInputElement.value
    joinMeeting(ROOM_ID)
}
// function joinMeeting(ROOM_ID){
//     //ping server to join some room
// }
