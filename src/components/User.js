import React, { Component } from 'react';

class User extends Component {

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged(
      user => {this.props.setUser(user);}
    );
    console.log(this.props.user);
  }

  handleSignOn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut(){
    this.props.firebase.auth().signOut();
    this.props.setUser('');
  }

  render(){
    return(
      <div className="signOnOut">
        <p>Logged in as: {this.props.user ? this.props.user.displayName : 'Guest'}</p>
        <button className="sign-on-button" onClick={()=> this.handleSignOn()}>Sign In</button>
        <button className="sign-out-button" onClick={()=> this.handleSignOut()}>Sign Out</button>
      </div>

    )
  }
}

export default User;
