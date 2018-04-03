import React, { PropTypes } from 'react'
import {connect } from 'react-redux' 
import { handlePlayPause, handleNextSong, handlePrevSong } from '../../actions/controls'
import FlatButton from 'material-ui/FlatButton'

class WebPlayerContainer extends React.Component {

  render() {
		console.log('is playing?' + this.props.isPlaying)
    return (
		<div> 
		  <img src="http://placehold.it/75x75" />
			  <div style= {{display: 'inline-block', marginLeft: 10}}> 
				<FlatButton 
			    	label='prev'
			    	onClick={ () =>  this.props.prevSong()}
			    />
			    <FlatButton 
			    	label={this.props.isPlaying ? 'pause' : 'play'}
			    	onClick={ () =>  this.props.playPause(this.props.access_token, this.props.isPlaying )}
			    />
					<FlatButton 
			    	label='next'
			    	onClick={ () =>  this.props.nextSong()}
			    />
	 	  </div> 
		</div>      
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isPlaying: state.controls.isPlaying,

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		playPause : (access_token, isPlaying) => dispatch(handlePlayPause(access_token,isPlaying)), 
		prevSong: () => dispatch(handlePrevSong()),
		nextSong: () => dispatch(handleNextSong())
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(WebPlayerContainer) 

