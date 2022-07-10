export const reducer = (state={value: 0}, action) => {
    switch(action.type) {
        case 'increase':
            return {...state, value: state.value + (action.payload ?? 1)}
        default:
            return { ...state }
    }
}

export const logger = ({getState, dispatch}) => {
    return (next) => (action) => {
        console.log('以前的state:')
        console.log(getState())
        next(action)
        console.log('当前的state:')
        console.log(getState())
    }
}

export const thunk = ({getState, dispatch}) => {
    return (next) => (action) => {
        if (typeof action === 'function') {
            action(dispatch, getState)
        } else {
            next(action)
        }
    }
}

export const promise = ({getState, dispatch}) => {
    return (next) => (action) => {
        if (action instanceof Promise) {
            action.then((actualAction) => dispatch(actualAction))
        } else {
            next(action)
        }
    }
}