import {NOT_LOGGED_IN, LOGGED_IN, GOT_USER_INFO} from  './actionTypes'

const loggedIn = (access_token, refresh_token) => {
    return {
        type : LOGGED_IN, 
        access_token,
        refresh_token,
    }
}

const notLoggedIn = (auth_info) => {
    return {
        type : NOT_LOGGED_IN, 
    }
}

const userInfo = (userId) => {
    return {
        type: GOT_USER_INFO,
        userId, 
    }
}

/*thunks*/
export const handleCheckLoggedIn = () =>  async (dispatch) => {
    const params = getHashParams() 
    if (params.access_token)
        dispatch(loggedIn(params.access_token,params.refresh_token)) 
    else {
        dispatch(notLoggedIn())
        return 
    }

    try {
        const authString = await 'Bearer ' + params.access_token
        const res = await fetch('https://api.spotify.com/v1/me' ,
          { headers: {
              'Authorization': authString
            }, 
            method: 'GET'
        })
        const resJson = await res.json()
        dispatch(userInfo(resJson.id))
      }
      catch (e) {
        console.log("There was an error getting /me") 
        console.log(e) 
    }

}

export const handleGetRefreshToken = () => async (dispatch) => {
    //get refresh token
}

/*helpers*/
const getHashParams = () => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
  }