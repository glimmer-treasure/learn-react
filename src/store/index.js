import { applyMiddleware,createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// import { createStore, applyMiddleware } from '../utils/Redux'
// import { reducer, logger, thunk, promise } from '../utils/Redux'

import '../styles/Redux.css'

export const store = createStore(reducer, applyMiddleware(thunk, promise, logger))