import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'redux-zero/react'
import actions from './actions'

const mapToProps = ({ isAuthenticated }) => ({ isAuthenticated });

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      password2: ''
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
    fetch('/api/register', {
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
      this.props.changeUser()
      console.log("Login state", this.props.isAuthenticated)
      localStorage.setItem('token', res.token);
      this.props.history.push('/')
    })
    .catch(err => {
      console.error(err);
      alert('Error registering in please try again');
    });
  }


  render(){
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Register for an new account
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
            required
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm Password'
            type='password'
            name="password2"
            value={this.state.password2}
            onChange={this.handleInputChange}
            required
          />
          <Button color='teal' fluid size='large'>
            Register
          </Button>
        </Segment>
      </Form>
      <Message>
        Already an User? <Link to='/login'>Login</Link>
      </Message>
    </Grid.Column>
  </Grid>
    )
  }
}

export default connect(
  mapToProps,
  actions
)(Register)