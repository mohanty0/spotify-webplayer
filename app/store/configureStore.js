import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from './logger'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(
        rootReducer, composeEnhancers(
        applyMiddleware(thunk, logger)
    ))
}

export default configureStore