import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state= {
      messages: [
        {
          username: '',
          content: '',
          sentAt: '',
          roomId: ''
        }
      ]
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }


  render(){
    const roomMessages = (this.state.messages
    .filter(message => this.props.activeRoom === message.roomId.toString())
    .map(message =>
      {
        return(
          <div className="message-box" key={message.key}>
            <div className="username">{message.username}</div>
            <div className="content">{message.content}</div>
          </div>
        )
      }
    ));
    return(
      this.props.activeRoom ?
        <div className="message-list">
          {roomMessages}
        </div> : <h1>Select a Room to view messages</h1>

    );
  }
}

export default MessageList;
