export const createStore = (reducer) => {
    let state = null
    let callbacks = []
    const getState = () => state
    const subscribe = (callback) => {
        callbacks.push(callback)
        const unsubscribe = () => {
            callbacks = callbacks.filter(item => item !== callback)
        }
        return unsubscribe
    }
    const dispatch = (action) => {
        state = reducer(state, action)
        callbacks.forEach(callback => callback())
    }
    dispatch({type: +new Date})
    return {
        getState,
        subscribe,
        dispatch
    }
}