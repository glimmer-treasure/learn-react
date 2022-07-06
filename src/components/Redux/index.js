const compose = (...funcs) => {
    if (funcs.length === 0) {
        return (...args) => args
    } else if (funcs.length === 1) {
        return funcs[0]
    } else {
        const composedFunc = funcs.reduce((prev, cur) => {
            return (...args) => prev(cur(...args))
        })
        return composedFunc
    }
}

export const createStore = (reducer, enhancer) => {
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }
    let state = undefined
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
    dispatch({ type: +new Date })
    return {
        getState,
        subscribe,
        dispatch
    }
}

export const applyMiddleware = (...middlewares) => {
    return (createStore) => {
        return (reducer) => {
            const { getState, dispatch, subscribe } = createStore(reducer)
            const midApi = {
                getState,
                dispatch: (action, ...args) => dispatch(action, ...args)
            }
            const middlewareChain = middlewares.map((middleware) => middleware(midApi))
            const enhancedDispatch = compose(...middlewareChain)(dispatch)
            return {
                getState,
                dispatch: enhancedDispatch,
                subscribe,
            }
        }
    }
}

