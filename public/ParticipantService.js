const participantElement = document.getElementById('participants')

var participantList = []

function addParticipant(userId) {
    participantList.push(userId)
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

    var code=""

    for(var participant of participantList){
        code += participant + "<br></br>"
    }

    participantElement.innerHTML = code

}
