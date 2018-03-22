import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    })
  }

  handleChange(e){
    this.setState({ newRoomName: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    })
    this.setState({ newRoomName: '' })
  }

  setActiveRoom(room, e){
    e.preventDefault();
    this.props.currentRoom(room.key, room.name);
  }

  render(){
    return (
      <div className="left-side">
        <div className="create-room-form">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <h3>Add Room</h3>
            <input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e)}/>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <ul className="room-list">
          {
            this.state.rooms.map( (room, index) =>
              <li key={room.key} onClick={(e) => this.setActiveRoom(room, e)}>{room.name}</li>
            )
          }
        </ul>
      </div>
    );
  }

}

export default RoomList;
