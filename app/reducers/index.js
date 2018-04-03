import {combineReducers } from 'redux'
import controls from './controls'
import auth from './auth'

export default combineReducers({
    auth, 
    controls,
})