// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let count = new Set(wss.clients);
  let countSize = count.size;
  console.log(count.size)
  console.log('Client connected');

  let messageCount = {
    content: countSize,
    type: "countSize"

  }
  let newUserMessage = {
      content: "A new user has joined the Channel",
      type: "notification"
    }

wss.broadcast(JSON.stringify(messageCount));
wss.broadcast(JSON.stringify(newUserMessage));


  // let connection = {
  //   content : "A user has connected",
  //   type: "newUser"
  // };
  // wss.broadcast(JSON.stringify(connection));


  ws.on('message', function incoming(message) {
    console.log("initial message socket", message);
    let messageObject = JSON.parse(message);
    console.log("message object:", messageObject);
        let messageToBroadcast = {
            id: uuidv1(),
            username: messageObject.name,
            content: messageObject.message,
            type: messageObject.type
        };
        console.log(messageToBroadcast);
        console.log("Number of people in the sever", count);

        wss.broadcast(JSON.stringify(messageToBroadcast));
    });


  ws.on('close', () => {

    let newUserMessage = {
      content: "A new user has left the channel",
      type: "notification"
    }
    countSize = countSize - 1;

    let messageCount = {
    content: countSize,
    type: "countSize"
  }


    wss.broadcast(JSON.stringify(messageCount));
    wss.broadcast(JSON.stringify(newUserMessage));
  });

});
  // let close = {
  //   content: "A user has disconnected",
  //   type: "closeConnection"
  // };
  // wss.broadcast(JSON.stringify(close));


