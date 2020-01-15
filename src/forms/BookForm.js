import React, { Component } from "react";
import { observer } from "mobx-react";

import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };

  submitAuthor = async event => {
    event.preventDefault();
    await bookStore.addBook(this.state, this.props.author.id);
    this.props.closeModal();
  };

  textChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    console.log(this.props);
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitAuthor}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input type="text" className="form-control" name="title" onChange={this.textChangeHandler} required/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select className="form-control" name="color" onChange={this.textChangeHandler} required>
              <option></option>
              <option>red</option>
              <option>yellow</option>
              <option>green</option>
              <option>black</option>
              <option>white</option>
              <option>blue</option>
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
