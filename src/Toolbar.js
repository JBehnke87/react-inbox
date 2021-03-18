import { Component } from "react";

class Toolbar extends Component {

  state = { selectedCounter: 0 }

  componentDidMount() {
    this.countSelected();
  }

  countSelected = () => {
    let counter = this.props.allMessages.filter(msg => msg.selected === true).length;
    this.setState({ selectedCounter: counter })
   
    console.log(this.state.selectedCounter);
  }

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
            { countOfSelectedMsg === countOfAllMessages ? <i className="fa fa-check-square-o"></i> : (countOfAllMessages > 0 ? <i class="fa fa-minus-square-o"></i> : <i class="fa fa-square-o"></i>) }
          </button>

          <button className="btn btn-default">
            Mark As Read
          </button>

          <button className="btn btn-default">
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

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>)
  }

}

export default Toolbar;