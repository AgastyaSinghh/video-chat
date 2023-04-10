"use strict";

const socket = io('/')

const participantElement = document.getElementById('participants')
const videoGridElement = document.getElementById('video-grid')
const chatBoxElement = document.getElementById('div-chat-main')

var MY_PEER_ID = undefined
var participantList = []

const mediaConstraints = {
  audio: true,
  video: {width: {exact: 320}, height: {exact: 240}, frameRate: {exact: 10}}
};



const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})

// const myVideo = document.createElement('video').setAttribute('id', 'my-video')
const myVideo = document.createElement('video')
var myStream = undefined
myVideo.muted = true
console.log("video is on")

const peerList = {}

navigator.mediaDevices.getUserMedia(mediaConstraints).then(my_stream => {
  myStream = my_stream
  addVideoStream(myVideo, my_stream)
  console.log(MY_PEER_ID)


  socket.on('user-connected', (newUserId) => {
    connectToNewUser(newUserId)
  })



})

socket.on('user-disconnected', userId => {
  if (peerList[userId]) peerList[userId].close()
  removeParticipant(userId)
  //remove its element
  console.log('Participant left: ', userId)
  var elementId = 'video-' + userId
  var element = document.getElementById(elementId)
  if(element != null) element.remove()
  else console.log("video element not found for |", elementId)
})

socket.on('receive', msg => {
  chatBoxElement.innerHTML += msg + "<br></br>"
})

function sendMessage(){
  var msg = document.getElementById("input-msg").value
  if(msg == "") return
  document.getElementById("input-msg").value = ""
  socket.emit('send-msg', msg)
  chatBoxElement.innerHTML += msg + "<br></br>"
}

myPeer.on('open', (user_id) => {
  MY_PEER_ID = user_id;
  console.log("My ID is: ", MY_PEER_ID)
  document.getElementById("peer-id-field").innerText += MY_PEER_ID
  socket.emit('join-room', ROOM_ID, MY_PEER_ID)
})

myPeer.on('call', (mediaConnection) => {

  
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(my_stream => {

    mediaConnection.answer(my_stream)
  
    var peer_id = mediaConnection.peer
    const peerVideoElement = document.createElement('video')
    peerVideoElement.id = 'video-' + peer_id;
    addParticipant(peer_id)


    mediaConnection.on('stream', (peerUserVideoStream) => {
      addVideoStream(peerVideoElement, peerUserVideoStream)
    })
  })




  
})

function connectToNewUser(peerId) {
  const call = myPeer.call(peerId, myStream)
  
  const peerVideoElement = document.createElement('video')
  peerVideoElement.id = 'video-' + peerId;
  addParticipant(peerId)
  peerList[peerId] = call


  call.on('stream', remoteStream => {
    addVideoStream(peerVideoElement, remoteStream)
  })
  
}


//video is the document element
// stream is the video stream
function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGridElement.append(video)
  console.log("Added video")
}



function addParticipant(userId) {
  console.log("Added to participant list: ", userId)
  participantList.push(userId)
  console.log(participantList)
  updateList()
}


function removeParticipant(userId) {
  
  for( var i = 0; i < participantList.length; i++){ 
      // TODO check == or ===
      if ( participantList[i] == userId) { 
          participantList.splice(i, 1); 
          break;
      }
  }

  updateList()
}


function updateList(){
  
  // TODO display the list 

  var code="Participants <br>"

  for(var participant of participantList){
      code += participant + "<br></br>"
  }

  participantElement.innerHTML = code

}