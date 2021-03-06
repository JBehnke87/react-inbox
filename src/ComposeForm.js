import { Component } from "react"


class ComposeForm extends Component {

    state = { subject: "", body: "" }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {

        const body = this.state;

        return <form className="form-horizontal well" onSubmit={this.props.addNewMessage.bind(this, body)}>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this.handleChange} ></input>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                <div className="col-sm-8">
                    <textarea name="body" id="body" className="form-control" onChange={this.handleChange}></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit" value="Send" className="btn btn-primary"></input>
                </div>
            </div>
        </form>
    }
}

export default ComposeForm;