import React, { Component } from 'react';

export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Enter data below!</h1>
        <input
          type="text"
          name="data"
          placeholder="Enter data"
          value={this.state.data}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}