import { applyMiddleware,createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// import { createStore, applyMiddleware } from '../utils/Redux'
// import { logger, thunk, promise } from '../utils/Redux'

import '../styles/Redux.css'

export const reducer = (state={value: 0}, action) => {
    switch(action.type) {
        case 'increase':
            return {...state, value: state.value + (action.payload ?? 1)}
        default:
            return { ...state }
    }
}

export const store = createStore(reducer, applyMiddleware(thunk, logger))