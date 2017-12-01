import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

const dataBase = {
  currentUser: {name: "Anonymous"}, //
  messages: [],
  count: null
}

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state =
      dataBase;
      this.nameSubmit = this.nameSubmit.bind(this);
      this.messageSubmit = this.messageSubmit.bind(this);

}

//function which handles user name changes from chatbar.jsx
nameSubmit(content){
  let preName = this.state.currentUser.name;
  if (content !== preName){
    let current = dataBase.currentUser = {
      name: "",
      message: `${preName} changed their name to ${content}`,
      type: "postNotification"
    }
    this.socket.send(JSON.stringify(dataBase.currentUser));
    this.setState({currentUser: {name: content }});
  } else{
    this.setState({currentUser: { name: preName}});
  }
}

//function which handles message submissions on enter from chatbar.jsx
messageSubmit(content) {
  let name = this.state.currentUser.name
  let message = {
    name: name,
    message: content,
    type: "postMessage"
  };
  this.socket.send(JSON.stringify(message));

}


componentDidMount(){
  this.socket = new WebSocket('ws://localhost:3001');
  this.socket.onopen = function(event) {
    console.log("Connected to server.");
  }
  //listens for messages from websockets and sets states depending on type
  this.socket.addEventListener('message', (message) => {
    let messageObject = JSON.parse(message.data);
    switch (messageObject.type) {
      case "incomingMessage":
      case "incomingNotification":
        this.setState({ messages: this.state.messages.concat(messageObject) });
        break;
      case "countSize":
        this.setState({count: messageObject.content});
        break;
      default:
        throw new Error("Unknown event type " + messageObject.type);
    }

  });
}

  render() {

    return (
    <div>
      <MessageList messages = { this.state.messages }/>
      <ChatBar messageSubmit={ this.messageSubmit } nameSubmit={ this.nameSubmit } currentUser={ this.state.currentUser }/>
      <NavBar count = { this.state.count } />
    </div>
    );
  }
}
export default App;




