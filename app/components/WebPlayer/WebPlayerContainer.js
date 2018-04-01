import React, { PropTypes } from 'react'
import {connect } from 'react-redux' 
import { handlePlayPause } from '../../actions/controls'
import FlatButton from 'material-ui/FlatButton'

class WebPlayerContainer extends React.Component {


  componentDidMount = () => {
  
  }



  render() {
    return (
		<div> 
		  <img src="http://placehold.it/75x75" />
			  <div style= {{display: 'inline-block', marginLeft: 10}}> 
	    	
			    <FlatButton 
			    	label={this.props.isPlaying ? 'pause' : 'play'}
			    	onClick={ () =>  this.props.playPause(this.props.access_token, this.props.isPlaying)}
			    />
	 	  </div> 
		</div>      
    );
  }
}



const mapDispatchToProps = (dispatch) => {
	return {
		playPause : (access_token, isPlaying) => dispatch(handlePlayPause(access_token,isPlaying))
	}	
}

const mapStateToProps = (state) => {
	return {
		isPlaying: state.isPlaying,

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(WebPlayerContainer); 

