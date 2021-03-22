import './App.css';
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import dataList from './data'

import { Component } from 'react';

class App extends Component {

  state = { allMessages: [] }

  async componentDidMount() {
    const response = await fetch("http://localhost:8082/api/messages?delay=3000");
    const json = await response.json();

    this.setState({ allMessages: json })
  }

  setNewState = (newList) => {
    this.setState({ allMessages: newList })
  }

  setStarred = (id) => {
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
    this.setNewState(newList);
  }

  addLabel = (lbl) => {
    console.log(lbl)
        
    let newList = this.state.allMessages.map(msg => msg.selected === true ? ({ ...msg, labels: [...msg.labels, lbl] }) : msg);
    
    this.setNewState(newList);
  }

  removeLabel = (msg, lblRemoveVal) => {
    let newLblArray = msg.labels.filter(msgLbl => msgLbl !== lblRemoveVal)
    return newLblArray;
  }

  handleOnDelete = (lblRemoveVal) => {
    let newList = [];

    if (lblRemoveVal === "Remove Label") {
      newList = this.state.allMessages.filter(msg => msg.selected !== true);
    } else {
      newList = this.state.allMessages.map(msg => msg.selected === true ? ({ ...msg, labels: this.removeLabel(msg, lblRemoveVal) }) : ({ ...msg, labels: msg.labels }));
    }

    this.setNewState(newList);
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
        />
        <form className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary"></input>
            </div>
          </div>
        </form>
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