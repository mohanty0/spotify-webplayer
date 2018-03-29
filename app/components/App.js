import axios from 'axios';
import React from 'react';
import WebPlayerContainer from './WebPlayer/WebPlayerContainer'
import LoginPage from './LoginPage/LoginPage'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

  //create state with the access token and refresh token. 
    //if access token missing, then red
  constructor(props) { 
    super(props); 

    this.state = {
      access_token: "", 
      refresh_token: "", 
      error: "",
      userid: "" 
    }
  }

  componentDidMount = () => {
    if (this.checkAuth()) {
      this.getBasicInfo(); 
    }
  }

  getBasicInfo = async () => {
    try {
      const authString =  await 'Bearer ' + this.state.access_token; 
      console.log(authString); 
      const res = await fetch('https://api.spotify.com/v1/me' ,
        { headers: {
            'Authorization': authString
          }, 
          method: 'GET'
      }); 
      const resJson = await res.json(); 
      this.setState(prevState => ({
        userid: resJson.id
      })); 
    }
    catch (e) {
      console.log("There was an error"); 
      console.log(e); 
    }
  }

  getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
  }

  checkAuth = () => {
    let params = this.getHashParams(); 

    this.setState(prevState => ({
        access_token: params.access_token, 
        refresh_token: params.refresh_token, 
        error : params.error 
     }));

    return params.access_token ? true : false; 
  }

  obtainNewToken = () => {
    //refresh token
  }

  render = () => {
    if (this.state.access_token) {
      return (
      <MuiThemeProvider>
      <div>
        <WebPlayerContainer access_token={this.state.access_token}/>
      </div>
      </MuiThemeProvider>      
    );
    }
    return (
      <MuiThemeProvider>
        <LoginPage/>   
      </MuiThemeProvider> 
    );
  }
}


export default App;