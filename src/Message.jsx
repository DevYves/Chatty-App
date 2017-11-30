import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("this.props.messages", this.props.type);
    console.log("Rendering  message");
    if (this.props.type === "notification"){
       return (
      <div className="message system">
        {this.props.content}
      </div>
      );
    } else {
      return (

      <div className="message">
        <span className="message-username">{ this.props.user }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>

      );
    }
}
}

export default Message;



