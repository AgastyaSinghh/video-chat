> Running this application (Server side steps)

* Running the Server application
    
    ```node server.js```
* Running the peerjs on port 3001
    
    ```peerjs --port 3001```
     

>For End User (Client side)

* Creating a new room

Open the application on ```http://localhost:3000/``` and a new room would be created and you would we redirected to your room.

* Joining a new room

Enter ```http://localhost:3000/51e2f1b6-dfd5-4c78-a669-4ed1ad0e7b37``` something with roomid and you would join the meeting

> Change Log

* Initail Commit 
    > Features:

    1. Room Create : Home page creates a new room and redirects to the room

    2. Join Room : Enter the link for the room
    <br>
    
    > Limitations:

    1. Video Audio compulsary
    2. Removing participant takes time (fixed)
    3. Full quality so it starts lagging after 3-4 connetions (fixed)
    <br>
    <br>
    
    > Reason: 
    Uses Fully connected peer to peer topology

    For 720p 30FPS Connection 1280 * 720 *30 pixels are used = 2,76,48,000 pixels per second

    For 4 users in Fully connected P2P topology  each client has 3 incomming and 3 out going connections

    So Each client has to manage 16,58,88,000 pixels per second
    Which is very costly hence needs to be optimized.

* V1
    Changes:
    1. Added media constraints for reducing lag
* V2
    Changes:
    1. Fixed participant list
* V3
    Changes:
    1. Removing participant takes time (fixed)
    2. Added id for peer video elements
    3. Closed peer connection when someone left
    4. Removed video element for someone who left the meeting in other participants page
* Test Update 1
    Test page contains
    1. Code for having singleton media stream
    2. Mute / Unmute
    3. Camera on / off
* V4 
    Changes
    1. Chat added


> Features to be added:
1. chat (basic done, add sender, add time)

2. Mute / unmute self (in test)
3. Switch video on or off (in test)
4. Fix multiple navigator.mediaDevices.getUserMedia() (in test)

4. share screen
5. change camera / microphone
6. display name with participant
7. End call btn
8. get meeting details 
9. improve ui 
10. only admin can get details
11. mute/unmute a participant for self
