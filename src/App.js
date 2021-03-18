import './App.css';
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import dataList from './data'

import { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = { allMessages: dataList}
  }

  setStarred = (id) => {
    let newList = this.state.allMessages.map(msg => msg.id === id ? ({ ...msg, starred: !msg.starred }) : ({ ...msg, starred: msg.starred }));
    this.setState({ allMessages: newList })
  }

  selectAll = (value) => {
    let newList = this.state.allMessages.map(msg => ({ ...msg, selected: value }));
    this.setState({ allMessages: newList })
  }

  selectOne = (id) => {
    let newList = this.state.allMessages.map(msg => msg.id === id ? ({ ...msg, selected: !msg.selected }) : ({ ...msg, selected: msg.selected }));
    this.setState({ allMessages: newList })

    setTimeout(() => { console.log("AllMessagesAfterSelectOne", this.state.allMessages) }, 1000);
  }

  render() {
    { console.log("App is rendered") }

    return (
      <div className="App">
        { this.state.selectedCounter}
        <Toolbar allMessages={this.state.allMessages} selectAll={this.selectAll} selectedCounter={this.state.selectedCounter} />
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
        <MessageList key={this.state.allMessages} allMessages={this.state.allMessages} selectOne={this.selectOne} setStarred={this.setStarred} />
      </div>
    )
  }
}

export default App;