import React from 'react'; 
import FlatButton from 'material-ui/FlatButton';

class WebPlayerContainer extends React.Component {
  constructor(props) {
  	super(props); 

  	this.state = {
  		currSong: {
  			name: '', 
  			artists: [], 
  			album:  ''},
  		isPlaying: false, 
  	}

  	this.getCurrentSong = this.getCurrentSong.bind(this); 
  	this.playPause = this.playPause.bind(this); 
  	this.nextTrack = this.nextTrack.bind(this); 
  	this.prevTrack = this.prevTrack.bind(this); 

  }

  componentDidMount = () => {
  	this.getCurrentSong();
  }

  getCurrentSong = async () => {
  	try {
  	  const authString =  await 'Bearer ' + this.props.access_token; 
  	  const url = 'https://api.spotify.com/v1/me/player'; 
  	  const options = { 
      	headers: {
          'Authorization': authString
      	}, 
        method: 'GET'
      }; 
      const res = await fetch(url , options); 
      const response = await res.json(); 
      const song = {
      	name: response.item.name, 
      	artists: response.item.artists.map(artist => artist.name),
      	album:  response.item.album.name
      } 
      this.setState(prevState => ({
        currSong: song, 
        isPlaying: response.is_playing
      })); 
  	}
  	catch (e) {
  		console.log('There was an error\n' + e);
  	}
  }

  playPause = async () => {
  
  	try {
  	  const authString = await 'Bearer ' + this.props.access_token;
      const url = this.state.isPlaying ? 'https://api.spotify.com/v1/me/player/pause' : 'https://api.spotify.com/v1/me/player/play'; 
  	  const options =  { 
      	headers: {
          'Authorization': authString
      	}, 
        method: 'PUT'
      }; 
  	  await fetch(url, options); 
  	  this.setState(prevState => ({
  	  	isPlaying: !prevState.isPlaying
  	  })); 

  	}
  	catch (e) {
  		console.log("There was an error calling the play/pause endpoint");
  		console.log(e); 
  	}
  }

  nextTrack = async () => {

  }

  prevTrack = async () => {

  }

  render() {
    return (
		<div> 
		  <img src="http://placehold.it/75x75" />
			  <div style= {{display: 'inline-block', marginLeft: 10}}> 
	    		<div> {this.state.currSong.name}</div> 
			    <div> {this.state.currSong.artists.map(artist => artist+' ')} </div> 
			    <FlatButton 
			    	label='play/pause'
			    	onClick={this.playPause}
			    />
	 	  </div> 
		</div>      
    );
  }
}

export default WebPlayerContainer; 

