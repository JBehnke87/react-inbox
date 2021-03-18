import { Component } from "react";

class Message extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = { msg: this.props.message };
  }

  // setChecked = () => {

  //   const msgIsSelected = this.state.msg.selected;
  //   console.log(this.state.msg);
  //   this.setState({ msg: {...this.state.msg, selected: msgIsSelected !== undefined ? !msgIsSelected : true } });
  //   // this.props.selectedCounter();
  //   console.log(msgIsSelected !== undefined ? !msgIsSelected : "undefined to true");

  //   setTimeout(() => { console.log(this.state.msg)},1000);
  // }



  render() {
    { console.log("Msg is rendered", this.props.message)
}

    return (<div className={"row message " + (this.props.message.read ? "read " : "unread ") + (this.props.message.selected ? "selected" : "")}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            {this.props.message.selected ? <input type="checkbox" checked="checked" onChange={this.props.selectOne.bind(this, this.props.message.id)} />: <input type="checkbox" onChange={this.props.selectOne.bind(this, this.props.message.id)} /> }
          </div>
          <div className="col-xs-2">
            {this.props.message.starred ? <i className="star fa fa-star" onClick={this.props.setStarred.bind(this, this.props.message.id)}></i> : <i className="star fa fa-star-o" onClick={this.props.setStarred.bind(this, this.props.message.id)}></i>}
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {this.props.message.labels.find(label => label === "dev") === "dev" ? <span className="label label-warning">dev</span> : null}
        {this.props.message.labels.find(label => label === "personal") === "personal" ? <span className="label label-warning">gschool</span> : null}
        <a href="#">
          {this.props.message.subject}
        </a>
      </div>
    </div>)
  }

}

export default Message;