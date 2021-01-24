# Doug's Real Time Text Chat!

[![Douglas MacKrell](https://www.douglasmackrell.com/Doug-Portfolio-Social.png)](https://dougmackrell.com)

**Douglas MacKrell** is a NYC based Full Stack Web Developer who is currently employed as a Software Engineer Apprentice at Peloton Interactive! 

## THE PROBLEM
Implementing a peer to peer text chat using only socket.io

## THE SOLUTION
This web app uses socket.io to connect users and allow them to text one another in real time

** **

## FEATURES

* Connects users through their socket IDs within a created room instance
* Allows users create a new chat room or join an existing one
* Prompts users for their username, and stores those usernames in the server
* Informs users that they have joined the room
* Broadcasts sent text to all users in the room save for the broadcaster
* Sent texts include "userName: " so others know which user has sent the received text
* Echos the sender's submitted text to only the sender with a "You: " qualifier for the sake of readability

## FUTURE FEATURES

* Full CSS Styling

## TECHNICAL MILESTONES

* Learning how to overcome a CORS block without installing the CORS library
* Strengthening my understanding of socket.io 
* Better understanding how to capture and implement a disconnect event when a user closes a browser window
* Learning how to have sockets target the server once fully deployed
* Figuring out how to secretly clear the stored rooms from the deployed server so vacant rooms don't clog up the interface   

## TECHNOLOGIES USED

* **JavaScript**
* **HTML5**
* **Node**
* **Express**
* **ejs**
* **Socket.io**

## LOCAL SETUP

**NOTE: You must install [Node.js](https://nodejs.org) in your computer for this to run.**

You can check to see if you already have Node.js by typing `node -v` in your terminal. If your shell/terminal doesn't complain and you see version numbers you are good to go.

1. Clone this repo into a folder of your choice:

       `git clone https://github.com/DouglasMacKrell/real-time-chat-app.git`

2. Install dependencies for the app from inside the cloned root folder:

       `npm install`

3. Once you have installed your dependencies, you have to update the code so your sockets target your localhost. First, open the `public/script.js` and change line 1 from:

       `const socket = io("https://dougs-real-time-chat-app.herokuapp.com/");`

to

       `const socket = io("http://localhost:3000");`

4. Next, open `views/clean.ejs` and change line 7 from:

       `<script defer src="https://dougs-real-time-chat-app.herokuapp.com/socket.io/socket.io.js"></script>`

to

       `<script defer src="http://localhost:3000/socket.io/socket.io.js"></script>`

5. Make the exact same change to the script tags found in `views/index.ejs` and `views/room.ejs`

6. To launch the App, make sure you have nothing else running on port 3000, from inside the root folder run:

       `npm run devStart`

7. Open `http://localhost:3000` in a new browser window.

8. Enter a room name to create a new room. This user will automatically join the room they create. 

9. Open `http://localhost:3000` in a separate browser window. You should be able to see the room you've created in step 5. Click the link to join that room.

10. Once you enter the room, you will be prompted to enter a user name. After one has been entered, a notification will be broadcast to all users in the same room. 

11. To disconnect from the chat, simply close the browser window. All other connected users will receive a disconnection notification instantly.

12. If you encounter problems, check the terminals output for errors. If you are unable to troubleshoot the problem, I would be happy to address issues so please open one [here](/issues)

---

### Please check out one of my favorite WebRTC projects, [DougTV!](https://dougtv.herokuapp.com)

---

[![DougTV Social Media](https://dougtv.herokuapp.com/DougTV-Social.png)](https://dougtv.herokuapp.com)

---

<details>
    <summary>
        Before you leave, please take note:
    </summary>

You're the best! Thank you for visiting!

Please give this project a star and be sure to check out my [YouTube Channel](https://youtube.com/BigMacKrell)!

</details>
