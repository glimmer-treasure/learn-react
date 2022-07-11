import React, { useContext, useLayoutEffect, useReducer } from 'react'
import { bindActionCreators } from '../Redux'

const Context = React.createContext()

export const Provider = ({ store, children }) => {
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
}


const useSubscribeUpdate = (subscribe) => {
    console.log('run useSubscribeUpdate')
    const [_, forceUpdate] = useReducer((state) => state + 1, 0)
    useLayoutEffect(() => {
        console.log('run useLayoutEffect')
        const unsubscribe = subscribe(forceUpdate)
        return unsubscribe
    }, [subscribe])
}

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (props) => {
    const { getState, subscribe, dispatch } = useContext(Context)
    const stateProps = mapStateToProps(getState())
    let dispatchProps = null
    if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
    } else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    } else {
        dispatchProps = { dispatch }
    }
    useSubscribeUpdate(subscribe)
    return (
        <WrappedComponent {...stateProps} {...dispatchProps} {...props} dispatch={dispatch} />

    )
}

export const useSelector = (selector) => {
    const {getState, subscribe} = useContext(Context)
    useSubscribeUpdate(subscribe)
    return selector(getState())
}

export const useDispatch = () => {
    const {dispatch} = useContext(Context)
    return dispatch
}