
import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.onMessageKeyPress = this.onMessageKeyPress.bind(this);
    this.onUserNameInput = this.onUserNameInput.bind(this);
  }

  onMessageKeyPress(event) {
    let content = event.target.value;
    if (event.key === 'Enter'){
      this.props.messageSubmit(content);
      event.target.value = "";
    }
  }

  onUserNameInput(event) {
    //caputure the input
    let userName = event.target.value;
    //set the app components current user state to value
    this.props.nameSubmit(userName);

    }

    render() {
      console.log("Rendering  chatbar");
      return (

      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ this.props.currentUser.name } onBlur={ this.onUserNameInput} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.onMessageKeyPress } />
      </footer>

      );
    }
}
export default ChatBar;





