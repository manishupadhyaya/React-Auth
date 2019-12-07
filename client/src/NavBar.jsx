import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'
import {
    Button,
    Container,
    Icon,
    Responsive,
    Visibility,
  } from 'semantic-ui-react'
  import 'semantic-ui-css/semantic.min.css';
  import {connect} from 'redux-zero/react'
  import actions from './actions'

  const getWidth = () => {
    const isSSR = typeof window === 'undefined'
  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }
  const mapToProps = ({ isAuthenticated }) => ({ isAuthenticated });

class DesktopContainer extends Component {
    constructor(props)
      {
          super(props);
          this.state = {
              user: this.props.user
          }
      }
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { fixed, activeItem, user } = this.state
      console.log("userDesktop",user)
      return (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 100, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                    Home
                  </Menu.Item>
                  <Menu.Item as={Link} to='/profile' name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>Profile</Menu.Item>
                  <Menu.Item as={Link} to='/shop' name='shop' active={activeItem === 'shop'} onClick={this.handleItemClick}>E-Commerce</Menu.Item>
                  <Menu.Item as={Link} to='/gov' name='gov'active={activeItem === 'gov'} onClick={this.handleItemClick}>Government Schemes</Menu.Item>
                  <Menu.Item position='right'>
                    {user?
                    <div>
                    <Menu.Item as={Link} to='/' name='home' onClick={this.handleItemClick}>
                        Welcome!
                    </Menu.Item>
                      </div>
                    :
                    <div>
                        <Button as={Link} to='/login' inverted={!fixed} >
                          Log in
                        </Button>
                    <Button as={Link} to='/register' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                    </div>
                }
                  </Menu.Item>
                </Container>
              </Menu>
  
              
  
  
              {/* <HomepageHeading /> */}
            </Segment>
          </Visibility>
        </Responsive>
      )
    }
  }

  class MobileContainer extends Component {
      constructor(props)
      {
          super(props);
          this.state = {
            isUser: this.props.isUser
          }
      }
  
    handleSidebarHide = () => this.setState({ sidebarOpened: false })
  
    handleToggle = () => this.setState({ sidebarOpened: true })
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { sidebarOpened, activeItem } = this.state
  
      return (
        <Responsive
          as={Sidebar.Pushable}
          getWidth={getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
        >
          <Sidebar
            as={Menu}
            animation='push'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>Home</Menu.Item>
            <Menu.Item as={Link} to='/profile' name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>Profile</Menu.Item>
            <Menu.Item as={Link} to='/shop' name='shop' active={activeItem === 'shop'} onClick={this.handleItemClick}>E-Commerce</Menu.Item>
            <Menu.Item as={Link} to='/gov' name='gov'active={activeItem === 'gov'} onClick={this.handleItemClick}>Government Schemes</Menu.Item>
            <Menu.Item as={Link} to='/login' inverted>Log in</Menu.Item>
            <Menu.Item as={Link} to='/register' inverted primary style={{ marginLeft: '0.5em' }}>Sign Up</Menu.Item>
          </Sidebar>
  
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 200, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              {/* <HomepageHeading mobile /> */}
            </Segment>
          </Sidebar.Pusher>
        </Responsive>
      )
    }
  }

  class NavBar extends Component{
    constructor(props)
    {
        super(props);
        this.state = {

        }
        console.log("NavBar state", this.props.isAuthenticated)
    }
    render()
    {
        return(
        <div>
            <DesktopContainer user={this.props.isAuthenticated}/>
            <MobileContainer user={this.props.isAuthenticated}/>
        </div>
        )
    }
}

export default connect(
    mapToProps,
    actions
  )(NavBar)