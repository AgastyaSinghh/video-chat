var myStream = undefined

export async function getMyMediaStream(){
    if (myStream == undefined){
        myStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
        return myStream
    } else return myStream;
}

export var hi = "HI";

console.log('Hiiiii')

// module.exports({getMyMediaStream, hi})
  