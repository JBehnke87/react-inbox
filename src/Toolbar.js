import { Component } from "react";

class Toolbar extends Component {

  state = { lblRemoveVal: "Remove Label" }

  updateValue = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addLabel = (e) => {
    console.log(e.target.value)
    this.props.addLabel(e.target.value);
  }

  render() {
    const totalMsg = this.props.allMessages.length;
    const totalSelected = this.props.allMessages.filter(msg => msg.selected === true).length;
    const allSelected = totalSelected === totalMsg;

    const selectAll = this.props.selectAll.bind(this, true);
    const deselectAll = this.props.selectAll.bind(this, false);

    const readCounter = this.props.allMessages.filter(msg => msg.read === false).length;

    return (<div className="container">

      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{readCounter}</span>
            unread messages
          </p>
          <button className="btn btn-default" onClick={allSelected ? deselectAll : selectAll}>
            <i className={allSelected ? "fa fa-check-square-o" : (totalSelected > 0 ? "fa fa-minus-square-o" : "fa fa-square-o")}></i>
          </button>

          <button disabled={totalSelected === 0 ? "true" : null} onClick={this.props.markAsRead.bind(this, true)} className="btn btn-default">
            Mark As Read
          </button>

          <button disabled={totalSelected === 0 ? "true" : null} onClick={this.props.markAsRead.bind(this, false)} className="btn btn-default">
            Mark As Unread
          </button>

          <select disabled={totalSelected === 0 ? "true" : null} name="lblAddVal" onChange={this.addLabel} className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select disabled={totalSelected === 0 ? "true" : null} name="lblRemoveVal" onChange={this.updateValue} className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button disabled={totalSelected === 0 ? "true" : null} onClick={this.props.handleOnDelete.bind(this, this.state.lblRemoveVal)} className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>)
  }

}

export default Toolbar;