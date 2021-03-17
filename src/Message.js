import { Component } from "react";

class Message extends Component {

    state = { isSelected: "true" }

    constructor(props) {
      super(props);
      console.log(props)
    }

    render() {
        return (<div class={ this.props.message.read ? "row message read" : "row message unread"}>
        <div class="col-xs-1">
          <div class="row">
            <div class="col-xs-2">
              <input type="checkbox"/>
            </div>
            <div class="col-xs-2">
              { this.props.message.starred ? <i class="star fa fa-star"></i> : <i class="star fa fa-star-o"></i> }
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