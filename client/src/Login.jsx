import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'redux-zero/react'
import actions from './actions'



class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }
  handleInputChange = (event) => {
    const {value,name} = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then((res)=>{
      localStorage.setItem('token', res.token);
      this.props.history.push('/')
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }


  render(){
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      <Form size='large' onSubmit={this.onSubmit}>
        <Segment stacked>
          <Form.Input 
          fluid icon='user' 
          iconPosition='left' 
          placeholder='E-mail address'
          name="email"
          value={this.state.email} 
          onChange={this.handleInputChange} 
          required/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to='/register'>Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
    )
  }
}

export default Login