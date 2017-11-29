
import React, {Component} from 'react';


class ChatBar extends Component {

constructor(props) {
    super(props);
this.onMessageKeyPress = this.onMessageKeyPress.bind(this);
}




onMessageKeyPress(event) {
  let content = event.target.value;
  console.log(content);
  if (event.key === 'Enter'){
    this.props.enterSubmit(content);
  }
}



getMessageContent(e) {
    let content = e.target.value;
    if (e.key === 'Enter'){
      this.props.handleSubmit(content);

      console.log("From ChatBar: ", content);
    }
  }

  render() {
  console.log("Rendering  chatbar");
    return (

    <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.onMessageKeyPress} />
    </footer>

    );
  }
}
export default ChatBar;





