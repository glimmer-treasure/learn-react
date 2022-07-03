import '../../styles/FormField.css'
import React, { useContext, useReducer, useEffect } from 'react';
import {FormContext} from './FormStore'

const Field = (props) => {
    const {label = '', name = '', children} = props
    const {getFormValue, setFormValue, subscribe } = useContext(FormContext);
    const [_, dispatch] = useReducer((state) => state + 1, 0)
    const value = name && getFormValue(name)
    const child = React.cloneElement(children, {
        value: value ?? '',
        onChange: (e) => setFormValue({name, value: e.target.value})
    })
    useEffect(() => {
       const unsubscribe = subscribe(name, dispatch)
       return unsubscribe
    }, [])
    console.log(`Field: ${name} update, ${value}`)
    return (
        <div className="cl-form-field">
            <div className="cl-from-field__label">{label && `${label}：`}</div>
            <div className="cl-from-field__content">{child}</div>
        </div>
    ) 
}

export default Field