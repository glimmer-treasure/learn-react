import { useCallback, useEffect, useState } from 'react'
// import { applyMiddleware,createStore } from 'redux'
import { createStore, applyMiddleware } from '../components/Redux'
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import '../styles/Redux.css'

const reducer = (state={value: 0}, action) => {
    switch(action.type) {
        case 'increase':
            return {...state, value: state.value + 1}
        default:
            return { ...state }
    }
}

const logger = ({getState, dispatch}) => {
    return (next) => (action) => {
        console.log('以前的state:')
        console.log(getState())
        next(action)
        console.log('当前的state:')
        console.log(getState())
    }
}

const thunk = ({getState, dispatch}) => {
    return (next) => (action) => {
        if (typeof action === 'function') {
            action(next, getState)
        } else {
            next(action)
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

const FormPage = (props) => {
    const state = store.getState()
    const [_, forceUpdate] = useState(state)
    const increase = useCallback(() => {
        store.dispatch({type: 'increase'})
    })
    const asyncIncrease = useCallback(() => {
        store.dispatch((dispatch, getState) => {
            const state = getState()
            setTimeout(() => {
                dispatch({type: 'increase', payload: state.value + 3})
            }, 3000);
        })
    })
    useEffect(() => {
        return store.subscribe(() => forceUpdate(+new Date))
    }, [])
    return (
        <div className="redux__container">
            <input className="redux__input" value={state.value} />
            <div>
                <button className="redux__btn redux__btn--add-btn" onClick={increase}>同步加</button>
                <button className="redux__btn redux__btn--add-btn" onClick={asyncIncrease}>异步加</button>
            </div>
        </div>
    )
}

export default FormPage