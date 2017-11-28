import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

const dataBase = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: 1
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: 2
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      dataBase;

}

  render() {
    console.log("Rendering <App/>");
    console.log(this.state.messages);
    return (
    <div>
      <MessageList messages = {this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser}/>
    </div>
    );
  }
}
export default App;


