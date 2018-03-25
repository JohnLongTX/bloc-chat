import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBqFri1-q5j6PQwftBhzmhKBbJibtRtaRY",
    authDomain: "bloc-chat-59e3b.firebaseapp.com",
    databaseURL: "https://bloc-chat-59e3b.firebaseio.com",
    projectId: "bloc-chat-59e3b",
    storageBucket: "bloc-chat-59e3b.appspot.com",
    messagingSenderId: "775126179037"
  };
  firebase.initializeApp(config);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeRoom: '',
      activeRoomName: '',
      user: ''
    };



  }
  currentRoom(room, name){
    this.setState({ activeRoom: room, activeRoomName: name });
  }

  setUser(user){
    this.setState({ user: user });
  }

  home(){
    this.setState({ activeRoom: '', activeRoomName: '' });
  }

  render() {
    return (
      <div className="App">
        <div className="col-left">
          <h1 className="bloc-chat" onClick={()=> this.home()}>Bloc Chat</h1>
          <RoomList firebase={firebase} currentRoom={this.currentRoom.bind(this)} />
          <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
        </div>
        <div className="col-right">
          <div className="room-heading"><h1>{this.state.activeRoomName ? this.state.activeRoomName : "Select a Room"}</h1></div>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
        </div>
      </div>
    );
  }
}

export default App;
