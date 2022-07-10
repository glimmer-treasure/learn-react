import { useCallback, useEffect, useState } from 'react'
import { store } from '../store'

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
                dispatch({type: 'increase', payload: 3})
            }, 3000);
        })
    })
    const promiseIncrease = useCallback(() => {
        let promise = new Promise((resolve) => {
            setTimeout(() => resolve({type: 'increase', payload: 3}), 3000)
        })
        store.dispatch(promise)
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
                <button className="redux__btn redux__btn--add-btn" onClick={promiseIncrease}>Promise加</button>
            </div>
        </div>
    )
}

export default FormPage