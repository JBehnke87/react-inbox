import { Component } from "react";
import Message from './Message'
import dataList from './data'

class MessageList extends Component {

    render() {
        return (<div className="container">
            { dataList.map(listItem => <Message message={listItem}/>) }
        </div>)
    }

}

export default MessageList;