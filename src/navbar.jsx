import React, {Component} from 'react';
class NavBar extends Component {
  render() {

    return (

<nav class="navbar">
      <a href="/" className="navbar-brand">Chatty  </a>
      <span> Number of users online: {this.props.count} </span>
    </nav>
    );
  }
}

 export default NavBar;