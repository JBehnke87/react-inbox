import { Component } from "react";
import Message from './Message'

class MessageList extends Component {

    render() {
        return (<div className="container">
            { this.props.allMessages.map((msg, i) =>
                <Message
                    key={i}
                    message={msg}
                    allMessages={this.props.allMessages}
                    selectOne={this.props.selectOne}
                    setStarred={this.props.setStarred}
                />)
            }
        </div>)
    }

}

export default MessageList;