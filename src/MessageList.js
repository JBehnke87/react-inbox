import { Component } from "react";
import Message from './Message'
import dataList from './data'

class MessageList extends Component {

    constructor() {
        super();
        this.state = { msgList: dataList}
    }

    render() {
        return (<div className="container">
            { this.state.msgList.map(listItem => <Message message={listItem} setStarred={this.setStarred}/>) }
        </div>)
    }

}

export default MessageList;