import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

const dataBase = {
  currentUser: {name: "Bob"}, //
  messages: []
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

//function which handles
nameSubmit(content){
  let preName = this.state.currentUser.name;
  console.log("content", content)
  console.log("preName", preName)
  if (content !== preName){
    console.log("We got a new name here");
    let current = dataBase.currentUser = {
      name: "",
      message: `${preName} changed their name to ${content}`,
      type: "notification"
    }
    console.log("current user", current);
    this.socket.send(JSON.stringify(dataBase.currentUser));
    this.setState({currentUser: {name: content }});
  } else{
    this.setState({currentUser: { name: preName}});
  }
}


messageSubmit(content) {
  let name = this.state.currentUser.name
  let newId = this.state.messages.length + 1;
  let message = {
    name: name,
    message: content,
    type: "postMessage"
  };
  this.socket.send(JSON.stringify(message));

}

componentDidMount(){
    console.log('componentDidMount <App />');

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = function(event) {
      console.log("Connected to server.");
    }

    this.socket.addEventListener('message', (message) => {
      let messageObject = JSON.parse(message.data);
      console.log("Message object", messageObject);
      console.log("message type", messageObject.type);
        console.log("POST A NEW MESSAGE");
          this.setState({ messages: this.state.messages.concat(messageObject) });


    });
}


  render() {

    return (
    <div>
      <MessageList messages = { this.state.messages }/>
      <ChatBar messageSubmit={ this.messageSubmit } nameSubmit={ this.nameSubmit } currentUser={ this.state.currentUser }/>
    </div>
    );
  }
}
export default App;




