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
            let { getState, dispatch, subscribe } = createStore(reducer)
            const midApi = {
                getState,
                dispatch: (action, ...args) => dispatch(action, ...args)
            }
            const middlewareChain = middlewares.map((middleware) => middleware(midApi))
            dispatch = compose(...middlewareChain)(dispatch)
            return {
                getState,
                dispatch,
                subscribe,
            }
        }
    }
}

export const combineReducers = (reducerMap) => {
    return (state = {}, action) => {
        let shouldUpdate = false
        const nextState = Object.entries(reducerMap).reduce((nextState, cur) => {
            const [name, reducer] = cur
            const partialState = state[name]
            const nextPartialState = reducer(partialState, action)
            shouldUpdate = shouldUpdate || (nextPartialState !== partialState)
            nextState[name] = nextPartialState
            return nextState
        }, {})
        shouldUpdate = shouldUpdate || (Object.keys(nextState).length !== Object.keys(state).length)
        return shouldUpdate ? nextState : state
    }
}

const bindActionCreator = (creator, dispatch) => compose(dispatch, creator)

export const bindActionCreators = (creators, dispatch) => {
    return Object.entries(creators).reduce((mapDispatchToProps, cur) => {
        const [name, creator] = cur 
        mapDispatchToProps[name] = bindActionCreator(creator, dispatch)
        return mapDispatchToProps
    }, {})
}
