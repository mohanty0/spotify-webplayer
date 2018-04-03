import axios from 'axios'
import React from 'react'
import {connect } from 'react-redux' 
import WebPlayerContainer from './WebPlayer/WebPlayerContainer'
import LoginPage from './LoginPage/LoginPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {handleCheckLoggedIn} from '../actions/auth'

class App extends React.Component {

  componentDidMount = () => {
    this.props.checkLoggedIn()
  }

  render = () => {
    if (this.props.loggedIn) {
      return (
      <MuiThemeProvider>
      <div>
        user {this.props.userId}
        <WebPlayerContainer/>
      </div>
      </MuiThemeProvider>      
    )
    }
    return (
      <MuiThemeProvider>
        <LoginPage/>   
      </MuiThemeProvider> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn : state.auth.loggedIn, 
    access_token: state.auth.access_token, 
    refresh_token: state.auth.refresh_token, 
    userId : state.auth.userId, 
  }
}

const mapDispactToProps = (dispatch) => {
  return {
    checkLoggedIn : () => dispatch(handleCheckLoggedIn())
  }
}

export default connect(mapStateToProps, mapDispactToProps)(App)