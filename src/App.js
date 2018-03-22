import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
      activeRoomName: ''
    };



  }
  currentRoom(room, name){
    this.setState({ activeRoom: room, activeRoomName: name });
  }


  render() {
    return (
      <div className="App">
        <div className="col-left">
          <h1>Bloc Chat</h1>
          <RoomList firebase={firebase} currentRoom={this.currentRoom.bind(this)} />
        </div>
        <div className="col-right">
          <h1>{this.state.activeRoomName}</h1>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </div>
      </div>
    );
  }
}

export default App;
