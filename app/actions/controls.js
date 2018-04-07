import {PLAY_SONG, PAUSE_SONG, NEXT_SONG, PREV_SONG, GOT_DEVICES} from './actionTypes'

const playSong = () => {
    return {
        type: PLAY_SONG,
    }
}

const pauseSong = ()  => {
    return {
        type: PAUSE_SONG, 
    }
}

const nextSong = () => {
    return {
        type: NEXT_SONG, 
    }
}

const prevSong = () => {
    return {
        type: PREV_SONG,
    }
}

const gotDevices = (devices) => {
    return {
        type: GOT_DEVICES,
        devices
    }
}

export const handlePlayPause = (access_token, isPlaying) => async (dispatch, getState) => {
    try {
        isPlaying ? dispatch(pauseSong()) : dispatch(playSong())
        const authString = 'Bearer ' + getState().auth.access_token
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

export const handleNextSong = () => async (dispatch, getState) => {
    try {
        const authString = 'Bearer ' + getState().auth.access_token 
        const url = 'https://api.spotify.com/v1/me/player/next'
        const options = {
            headers: {
                'Authorization': authString, 
            }, 
            method: "POST"
        }
        const res = await fetch(url, options)
        if (res.status === 204) {
            dispatch(nextSong())
            dispatch(playSong())
        }

    }
    catch (e) {
        console.log('There was an error calling /next')
        console.log(e)
    }
}

export const handlePrevSong = () => async (dispatch, getState) => {
    try {
        const authString = 'Bearer ' + getState().auth.access_token 
        const url = 'https://api.spotify.com/v1/me/player/previous'
        const options = {
            headers: {
                'Authorization': authString, 
            }, 
            method: 'POST'
        }
        const res = await fetch(url, options)
        if (res.status === 204) {
            dispatch(prevSong())
            dispatch(playSong())
        }

    }
    catch (e) {
        console.log('There was an error calling /next')
        console.log(e)
    }
}

export const handleGetDevices = () => async (dispatch, getState) => {
    try {
        const authString = 'Bearer ' + getState().auth.access_token
        const url = 'https://api.spotify.com/v1/me/player/devices'
        const options = {
            headers: {
                'Authorization': authString,
            }, 
            method: 'GET'
        }
        const res = await fetch(url, options)
        const resJson = await res.json(); 
        if (res.status === 200) {
            dispatch(gotDevices(resJson.devices))
        }
    
    }
    catch (e) {
        console.log('There was an error calling /devices')
        console.log(e)
    }
}

