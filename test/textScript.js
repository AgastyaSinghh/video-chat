const mediaConstraints = {
    audio: true,
    video: {width: {exact: 320}, height: {exact: 240}, frameRate: {exact: 10}}
};

const videoGridElement = document.getElementById('video-grid')



var myStream = undefined

async function getMyMediaStream(){
    if (myStream === undefined){
        myStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
        return myStream
    } else return myStream;
}


function add(){
    console.log("stream added")
    const myVideo = document.createElement('video')
    getMyMediaStream().then(stream =>{
        addVideoStream(myVideo, stream)
    })
}


function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGridElement.append(video)
    console.log("Added video")
}




// if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
//     console.log("enumerateDevices() not supported.");
//   } else {
//     // List cameras and microphones.
//     navigator.mediaDevices
//       .enumerateDevices()
//       .then((devices) => {
//         devices.forEach((device) => {
//           console.log(device.toJSON());
//         });
//       })
//       .catch((err) => {
//         console.log(`${err.name}: ${err.message}`);
//       });
//   }
  

function flipCamera(){
    console.log("Flip camera triggered")
    // myStream.enabled = false
    
    
    getMyMediaStream().then(stream => {
        var myStreamTrack = stream.getTracks()
        myStreamTrack.forEach(track => {
            if(track.kind == 'video'){
                if(track.enabled == false) track.enabled = true
                else track.enabled = false
            }
        });
    })
    
    // console.log(myStreamTrack)
}

function flipMic(){
    console.log("Flip mic triggered")
    // myStream.enabled = false

    getMyMediaStream().then(stream => {
        var myStreamTrack = stream.getTracks()
        myStreamTrack.forEach(track => {
            console.log(track)
            if(track.kind == 'audio'){
                if(track.enabled == false) track.enabled = true
                else track.enabled = false
            }
        });
    })

}