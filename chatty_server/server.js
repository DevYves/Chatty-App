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

wss.on('connection', (ws) => {
  let count = new Set(wss.clients);
  let countSize = count.size;
  let messageCount = {
    id: uuidv1(),
    content: countSize,
    type: "countSize"
  }
  let newUserMessage = {
    id: uuidv1(),
      content: "A new user has joined the Channel",
      type: "incomingNotification"
    }
  wss.broadcast(JSON.stringify(messageCount));
  wss.broadcast(JSON.stringify(newUserMessage));

  ws.on('message', function incoming(message) {
    let messageObject = JSON.parse(message);
    console.log("message on server", message);
    console.log("message type on server", messageObject.type);
    switch(messageObject.type) {
    case "postMessage":
      let messageToBroadcast = {
          id: uuidv1(),
          username: messageObject.name,
          content: messageObject.message,
          type: "incomingMessage"
      }
      wss.broadcast(JSON.stringify(messageToBroadcast));
      break;
    case "postNotification":
      let notificationToBroadcast = {
          id: uuidv1(),
          username: messageObject.name,
          content: messageObject.message,
          type: "incomingNotification"
        }
      wss.broadcast(JSON.stringify(notificationToBroadcast));

      break;
    }
  })

  ws.on('close', () => {

    let messageCount = {
    id: uuidv1(),
    content: countSize,
    type: "countSize"
  }

    let userExitMessage = {
      id: uuidv1(),
      content: "A new user has left the channel",
      type: "incomingNotification"
    }


    wss.broadcast(JSON.stringify(messageCount));
    wss.broadcast(JSON.stringify(userExitMessage));
  });

});
