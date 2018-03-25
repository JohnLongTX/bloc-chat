import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state= {
      messages: [],
      newContent: ''
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

  handleChange(e){
    this.setState({
      newContent: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.newContent){
      return;
    }else {
      this.messagesRef.push({
        content: this.state.newContent,
        username: this.props.user.displayName,
        roomId: this.props.activeRoom,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      })
      this.setState({ newContent: '' });
    }

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
      <div className="message-view">
        {this.props.activeRoom ?
        <div>
          <div className="message-list">
            {roomMessages}
          </div>
          <div className="send-box">
            <form onSubmit={(e)=> this.handleSubmit(e)}>
              <input type="text"
                className="send-text"
                value={this.state.newContent}
                onChange={(e)=> this.handleChange(e)}
                placeholder="Type message here..."
              />
              <input type="submit" value="Send" className="send-button"/>
            </form>
          </div>
        </div>

        : <div className="select-room"></div>}

      </div>
    );
  }
}

export default MessageList;
