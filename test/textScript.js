var textBox = document.getElementById("textBoxEle")

function add(){
    var userid = textBox.value
    addParticipant(userid)
}

function remove(){
    var userid = textBox.value
    removeParticipant(userid)
}