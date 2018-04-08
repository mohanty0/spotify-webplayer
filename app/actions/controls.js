import camelize from 'camelize'
import  {handleGetCurrPlayback } from './music'
import {PLAY_SONG, PAUSE_SONG, NEXT_SONG, PREV_SONG, GOT_DEVICES, ACTIVE_DEVICE, CURR_PLAYBACK} from './actionTypes'

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

const activeDevice = (device) => {
    return {
        type: ACTIVE_DEVICE, 
        device
    }
}


export const handlePlayPause = () => async (dispatch, getState) => {
    const isPlaying = getState().controls.song.isPlaying
    try {
        isPlaying ? dispatch(pauseSong()) : dispatch(playSong())
        const authString = 'Bearer ' + getState().auth.accessToken
        const url = isPlaying ? 'https://api.spotify.com/v1/me/player/pause' : 'https://api.spotify.com/v1/me/player/play'
        const options =  { 
            headers: {
                'Authorization': authString
            }, 
            method: 'PUT'
        } 
        const res = await fetch(url, options) 
        if (res.status !== 204) 
            throw res

    }
    catch (e) {
        isPlaying ? dispatch(playSong()) : dispatch(pauseSong()) 
        console.log("There was an error calling the play/pause endpoint")
        console.log(e)
    }
}

export const handleNextSong = () => async (dispatch, getState) => {
    try {
        const authString = 'Bearer ' + getState().auth.accessToken 
        const url = 'https://api.spotify.com/v1/me/player/next'
        const options = {
            headers: {
                'Authorization': authString, 
            }, 
            method: "POST"
        }
        const res = await fetch(url, options)
        if (res.status === 204) {
            dispatch(handleGetCurrPlayback())
            dispatch(nextSong())
            dispatch(playSong())
        } 
        else throw res

    }
    catch (e) {
        console.log('There was an error calling /next')
        console.log(e)
    }
}

export const handlePrevSong = () => async (dispatch, getState) => {
    try {
        const authString = 'Bearer ' + getState().auth.accessToken 
        const url = 'https://api.spotify.com/v1/me/player/previous'
        const options = {
            headers: {
                'Authorization': authString, 
            }, 
            method: 'POST'
        }
        const res = await fetch(url, options)
        if (res.status === 204) {
            dispatch(handleGetCurrPlayback())
            dispatch(prevSong())
            dispatch(playSong())
        } 
        else throw res
    }
    catch (e) {
        console.log('There was an error calling /next')
        console.log(e)
    }
}

export const handleGetDevices = () => async (dispatch, getState) => {
    try {
        const authString = 'Bearer ' + getState().auth.accessToken
        const url = 'https://api.spotify.com/v1/me/player/devices'
        const options = {
            headers: {
                'Authorization': authString,
            }, 
            method: 'GET'
        }
        const res = await fetch(url, options)
        if (res.status === 200) {
            const resJson = await res.json()
            const devices = camelize(resJson.devices); 
            dispatch(gotDevices(devices))
            for (const device of devices) {
                if (device.isActive === true) {
                    dispatch(activeDevice(device))
                }
            }
        } 
        else throw res 
    }
    catch (e) {
        console.log('There was an error calling /devices')
        console.log(e)
    }
}

