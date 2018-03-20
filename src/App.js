import React, { Component } from 'react';
import RoomList from './components/RoomList';
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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>

    );
  }
}

export default App;
