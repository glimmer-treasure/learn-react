import '../../styles/Form.css'
import { useForm  } from './FormStore'
import React from 'react';

const Form = (props) => {
    const {children = []} = props
    const [form] = useForm()
    return (
        <form className="cl-form">
            <div className="cl-form__content">
                {children}
            </div>
        </form>
    )
}

export default Form