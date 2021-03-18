import { Component } from "react";
import Message from './Message'

class MessageList extends Component {
    render() {
        { console.log("MsgList is rendered") }
        return (<div className="container">
            { this.props.allMessages.map((listItem, i) => <Message key={i} allMessages={this.props.allMessages} message={listItem} selectOne={this.props.selectOne} setStarred={this.props.setStarred} />)}
        </div>)
    }

}

export default MessageList;