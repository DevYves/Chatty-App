
import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.onMessageKeyPress = this.onMessageKeyPress.bind(this);
    this.onUserNameInput = this.onUserNameInput.bind(this);
  }

  onMessageKeyPress(event) {
    let content = event.target.value;
    // console.log(content);
    if (event.key === 'Enter'){
      this.props.enterSubmit(content);
      event.target.value = "";
    }
  }

  onUserNameInput(event) {
    // console.log(this.props);
    // capture input
    let userName = event.target.value;
    // set the app components current user state to value
    this.props.nameSubmit(userName);



    // let name = event.target.value;
    // if (event.key === 'Enter'){
    //   this.props.nameSubmit(name);
    //   event.target.value ="";

    }
  // }



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





