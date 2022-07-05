import { useCallback, useEffect, useState } from 'react'
import { applyMiddleware,createStore } from 'redux'
// import { createStore } from '../components/Redux'
import '../styles/Redux.css'

const reducer = (state={value: 0}, action) => {
    switch(action.type) {
        case 'increase':
            return {...state, value: state.value + 1}
        default:
            return { ...state }
    }
}

const store = createStore(reducer)

const FormPage = (props) => {
    const state = store.getState()
    const [_, forceUpdate] = useState(state)
    const increase = useCallback(() => {
        store.dispatch({type: 'increase'})
    })
    useEffect(() => {
        store.subscribe(() => forceUpdate(+new Date))
    }, [])
    return (
        <div className="redux__container">
            <input className="redux__input" value={state.value} />
            <button className="redux__btn--add-btn" onClick={increase}>同步加</button>
        </div>
    )
}

export default FormPage