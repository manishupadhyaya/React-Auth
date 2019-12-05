import React, { Component } from 'react';

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount() {
    fetch('/api/todos',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      }
    })
      .then(res => res.text())
      .then(res => {
        this.setState({message: res})
      });
  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}