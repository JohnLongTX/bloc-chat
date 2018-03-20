import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: []
    };
    this.rooms = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    this.rooms.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    })
  }

  render(){
    return (
      <ul className="room-list">
        {
          this.state.rooms.map( (room, index) =>
            <li key={index}>{room.name}</li>
          )
        }
      </ul>
    );
  }

}

export default RoomList;
