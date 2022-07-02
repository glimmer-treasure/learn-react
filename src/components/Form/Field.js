import '../../styles/FormField.css'
import React, { useContext } from 'react';
import {FormContext} from './FormStore'

const Field = (props) => {
    const {label = '', name = '', children} = props
    const {getFormValue, setFromValue } = useContext(FormContext);
    const value = name ? getFormValue?.(name) : ''
    const child = React.cloneElement(children, {
        value,
        onChange: (e) => setFromValue?.({name, value: e.target.value})
    })
    console.log(`Field: ${name} update`)
    return (
        <div className="cl-form-field">
            <div className="cl-from-field__label">{label && `${label}：`}</div>
            <div className="cl-from-field__content">{child}</div>
        </div>
    ) 
}

export default Field