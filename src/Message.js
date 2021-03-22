import { Component } from "react";

class Message extends Component {

  render() {
    const msg = this.props.message;
    const isChecked = msg.selected ? true : false;
    const isRead = msg.read ? "read " : "unread ";
    const isSelected = msg.selected ? "selected" : "";


    return (<div className={"row message " + isRead + isSelected}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={isChecked} onChange={this.props.selectOne.bind(this, msg.id)} />
            {}
          </div>
          <div className="col-xs-2">
            <i className={msg.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={this.props.setStarred.bind(this, msg.id)} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {msg.labels.find(label => label === "dev") === "dev" ? <span className="label label-warning">dev</span> : null}
        {msg.labels.find(label => label === "personal") === "personal" ? <span className="label label-warning">personal</span> : null}
        {msg.labels.find(label => label === "gschool") === "gschool" ? <span className="label label-warning">gschool</span> : null}
        <a href="#">
          {msg.subject}
        </a>
      </div>
    </div>)
  }

}

export default Message;