import React, {Component} from 'react';
class NavBar extends Component {
  render() {

    return (

<nav class="navbar">
      <a href="/" class="navbar-brand">Chatty  </a>
      <span> {this.props.count} </span>
    </nav>
    );
  }
}

 export default NavBar;