export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG' 
export const NEXT_SONG = 'NEXT_SONG'
export const PREV_SONG = 'PREV_SONG' 

const playSong = () => {
    return {
        type: 'PLAY_SONG',
    }
}

const pauseSong = ()  => {
    return {
        type: PAUSE_SONG, 
    }
}

const nextSong = (song) => {
    return {
        type: NEXT_SONG, 
        song, 
    }
}

const prevSong = (song) => {
    return {
        type: PREV_SONG, 
        song, 
    }
}

export const handlePlayPause =  (access_token, isPlaying) => {
    return async (dispatch, getState) => {
        try {
            isPlaying ? dispatch(pauseSong()) : dispatch(playSong())
            const authString = 'Bearer ' + access_token
            const url = isPlaying ? 'https://api.spotify.com/v1/me/player/pause' : 'https://api.spotify.com/v1/me/player/play'
            const options =  { 
                headers: {
                    'Authorization': authString
                }, 
                method: 'PUT'
            } 
            await fetch(url, options)
    
          }
          catch (e) {
              isPlaying ? dispatch(playSong()) : dispatch(pauseSong()) 
              console.log("There was an error calling the play/pause endpoint")
              console.log(e)
          }
    }
}