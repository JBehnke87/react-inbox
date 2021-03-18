import { Component } from "react";

class Toolbar extends Component {

  render() {
    const countOfAllMessages = this.props.allMessages.length;
    const countOfSelectedMsg = this.props.allMessages.filter(msg => msg.selected === true).length;

    return (<div className="container">

      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={countOfSelectedMsg === countOfAllMessages ? this.props.selectAll.bind(this, false) : this.props.selectAll.bind(this, true)}>
            {countOfSelectedMsg === countOfAllMessages ? <i className="fa fa-check-square-o"></i> : (countOfSelectedMsg > 0 ? <i className="fa fa-minus-square-o"></i> : <i className="fa fa-square-o"></i>)}
          </button>

          <button onClick={this.props.markAsRead.bind(this, true)} className="btn btn-default">
            Mark As Read
          </button>

          <button onClick={this.props.markAsRead.bind(this, false)} className="btn btn-default">
            Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={this.props.deleteMsg} className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>)
  }

}

export default Toolbar;