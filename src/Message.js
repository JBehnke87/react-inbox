import { Component } from "react";

class Message extends Component {

    constructor(props) {
      super(props);
      this.state = { msg: this.props.message, isSelected: false };
      console.log(this.state.msg)
    }

    setChecked = () => {
      this.setState({ isSelected: this.state.isSelected ? false : true})
    }

    setStarred = () => {
      let oldValue = this.state.msg.starred;
      this.setState({msg : { starred: !oldValue}})
    }

    render() {
        return (<div class={"row message " + (this.props.message.read ? "read " : "unread ") + (this.state.isSelected ? "selected" : "")}>
        <div class="col-xs-1">
          <div class="row">
            <div class="col-xs-2">
              <input type="checkbox" onChange={this.setChecked} /> 
            </div>
            <div class="col-xs-2">
              { this.state.msg.starred ? <i class="star fa fa-star" onClick={this.setStarred}></i> : <i class="star fa fa-star-o" onClick={this.setStarred}></i> }
            </div>
          </div>
        </div>
        <div class="col-xs-11">
          { this.props.message.labels.find(label => label === "dev") === "dev" ? <span class="label label-warning">dev</span> : null }
          { this.props.message.labels.find(label => label === "personal") === "personal" ? <span class="label label-warning">gschool</span> : null }
          <a href="#">
            { this.props.message.subject }
          </a>
        </div>
      </div>)
    }

}

export default Message;