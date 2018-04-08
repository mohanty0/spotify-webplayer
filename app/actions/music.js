import camelize from 'camelize'
import {GOT_CURR_PLAYBACK, NO_CURR_PLAYBACK} from './actionTypes'

const gotCurrPlayback = (playback) => {
    return {
        type: GOT_CURR_PLAYBACK, 
        playback,
    }
}

const noCurrPlayback = () => {
    return {
        type: NO_CURR_PLAYBACK,
    }
}

export const handleGetCurrPlayback = () => async (dispatch, getState) => {
    try {
        const authString = 'Bearer ' + getState().auth.accessToken
        const url = 'https://api.spotify.com/v1/me/player'
        const options = {
            headers: {
                'Authorization': authString
            }, 
            method: 'GET'
        }
        const res = await fetch(url, options)
       
        if (res.status === 200) {
            const resJson = camelize(await res.json())
            dispatch(gotCurrPlayback(resJson))
        }
        else if (res.status === 202) 
            dispatch(noCurrPlayback())
        else 
            throw res
    }
    catch (e) {
        console.log('There was an error calling /player') 
        console.log(e)
    }
}