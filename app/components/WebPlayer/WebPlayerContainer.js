import React, {PropTypes} from 'react'
import {connect} from 'react-redux' 
import {handlePlayPause, handleNextSong, handlePrevSong, handleGetDevices } from '../../actions/controls'
import {handleGetCurrPlayback} from '../../actions/music'
import FlatButton from 'material-ui/FlatButton'

class WebPlayerContainer extends React.Component {
	componentDidMount = () => {
		this.props.getCurrPlayback()
		this.props.getDevices()
	}

  render = () => {
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
		isPlaying: state.controls.song.isPlaying,

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		playPause : () => dispatch(handlePlayPause()), 
		prevSong: () => dispatch(handlePrevSong()),
		nextSong: () => dispatch(handleNextSong()),
		getDevices: () => dispatch(handleGetDevices()),
		getCurrPlayback: () => dispatch(handleGetCurrPlayback()),
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(WebPlayerContainer) 

