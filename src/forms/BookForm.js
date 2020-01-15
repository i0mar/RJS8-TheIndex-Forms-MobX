import React, { Component } from "react";
import { observer } from "mobx-react";

import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };

  submitBook = async event => {
    event.preventDefault();
    await bookStore.addBook(this.state, this.props.author.id);
    if (!bookStore.errors)
      this.props.closeModal();
  };

  textChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  getAllColors = () => {
    let colors = [];
    bookStore.books.forEach(book => {
      if (!colors.includes(book.color))
      colors.unshift(book.color);
    });

    return colors.map(color => <option>{color}</option>);
  };

  render() {
    console.log(this.props);
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
        {bookStore.errors && (
          <div className="alert alert-danger" role="alert">
            {bookStore.errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
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
              {this.getAllColors()}
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default observer(BookForm);
