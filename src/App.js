import './App.css';
import MessageList from './MessageList'
import Toolbar from './Toolbar'

import { Component } from 'react';
import ComposeForm from './ComposeForm';

class App extends Component {

  state = { allMessages: [], isComposeFormVisible: false }

  async componentDidMount() {
    await this.updateListFromServer();
  }

  async updateListFromServer() {
    const response = await fetch("http://localhost:8082/api/messages");
    const json = await response.json();
    this.setState({ allMessages: json });
  }

  async updateMsg(body) {
    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  async addMessageToServer(body) {
    await fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  toggleComposeFormVisibility = () => {
    this.setState({ isComposeFormVisible: !this.state.isComposeFormVisible })
  }

  setNewState = (newList) => {
    this.setState({ allMessages: newList })
  }

  setStarred = (id) => {
    this.updateStarredStatusOnServer(id);

    let newList = this.state.allMessages.map(msg => msg.id === id ? ({ ...msg, starred: !msg.starred }) : ({ ...msg, starred: msg.starred }));
    this.setNewState(newList);
  }

  selectAll = (value) => {
    let newList = this.state.allMessages.map(msg => ({ ...msg, selected: value }));
    this.setNewState(newList);
  }

  selectOne = (id) => {
    let newList = this.state.allMessages.map(msg => msg.id === id ? ({ ...msg, selected: !msg.selected }) : ({ ...msg, selected: msg.selected }));
    this.setNewState(newList);
  }

  markAsRead = (value) => {
    let newList = this.state.allMessages.map(msg => msg.selected === true ? ({ ...msg, read: value }) : ({ ...msg, read: msg.read }));

    this.updateReadStatusOnServer(value);

    this.setNewState(newList);
  }

  addLabel = (lbl) => {
    this.addMsgLabelToServer(lbl);

    let newList = this.state.allMessages.map(msg => msg.selected === true ? ({ ...msg, labels: [...msg.labels, lbl] }) : msg);
    this.setNewState(newList);
  }

  removeLabel = (msg, lblRemoveVal) => {
    this.removeMsgLabelFromServer(lblRemoveVal);

    let newLblArray = msg.labels.filter(msgLbl => msgLbl !== lblRemoveVal)
    return newLblArray;
  }

  handleOnDelete = (lblRemoveVal) => {
    let newList = [];

    if (lblRemoveVal === "Remove Label") {
      newList = this.state.allMessages.filter(msg => msg.selected !== true);
      this.removeMsgFromServer();
    } else {
      newList = this.state.allMessages.map(msg => msg.selected === true ? ({ ...msg, labels: this.removeLabel(msg, lblRemoveVal) }) : ({ ...msg, labels: msg.labels }));
    }

    this.setNewState(newList);
  }

  addNewMessage = (msg) => {
    const body = {
      subject: msg.subject,
      read: false,
      starred: false,
      labels: [],
      body: msg.body,
      id: this.state.allMessages.length + 1
    }
    this.addMessageToServer(body);

    this.setNewState([...this.state.allMessages, body]);
  }

  removeMsgFromServer() {
    let idsToUpdate = this.state.allMessages.filter(msg => msg.selected === true).map(msg => msg.id);
    const body = { "messageIds": idsToUpdate, command: "delete" };
    this.updateMsg(body);
  }

  removeMsgLabelFromServer(lbl) {
    let idsToUpdate = this.state.allMessages.filter(msg => msg.selected === true).map(msg => msg.id);
    const body = { "messageIds": idsToUpdate, command: "removeLabel", label: lbl };
    this.updateMsg(body);
  }

  addMsgLabelToServer(lbl) {
    let idsToUpdate = this.state.allMessages.filter(msg => msg.selected === true).map(msg => msg.id);
    const body = { "messageIds": idsToUpdate, command: "addLabel", label: lbl };
    this.updateMsg(body);
  }

  updateStarredStatusOnServer(id) {
    const body = { "messageIds": [...[], id], command: "star" };
    this.updateMsg(body);
  }

  updateReadStatusOnServer(value) {
    let idsToUpdate = this.state.allMessages.filter(msg => msg.selected === true).map(msg => msg.id);
    const body = { "messageIds": idsToUpdate, command: "read", read: value };
    this.updateMsg(body);
  }

  render() {

    return (
      <div className="App">
        <Toolbar
          allMessages={this.state.allMessages}
          selectAll={this.selectAll}
          handleOnDelete={this.handleOnDelete}
          markAsRead={this.markAsRead}
          addLabel={this.addLabel}
          isComposeFormVisible={this.state.isComposeFormVisible}
          toggleComposeFormVisibility={this.toggleComposeFormVisibility}
        />
        { this.state.isComposeFormVisible ? <ComposeForm addNewMessage={this.addNewMessage} /> : null}
        <MessageList
          allMessages={this.state.allMessages}
          selectOne={this.selectOne}
          setStarred={this.setStarred}
        />
      </div>
    )
  }
}

export default App;