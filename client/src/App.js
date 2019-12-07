import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import withAuthUser from './withAuthUser'
import Social from './Social'
import Navbar from './NavBar'
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import Todo from './Todo';
import Show from './Show';
import Register from './Register'


class App extends Component {

  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={withAuthUser(Social)} />
          <Route path="/homepage" component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/show" component={withAuth(Show)} />
          <Route path="/profile" component={withAuth(Todo)} />
          <Route path="/login" component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
