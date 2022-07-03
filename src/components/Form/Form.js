import '../../styles/Form.css'
import { useForm, FormContext  } from './FormStore'
import React from 'react';

const Form = (props) => {
    const {children = []} = props
    const [form] = useForm()
    return (
        <form className="cl-form">
            <FormContext.Provider value={form}>
                <div className="cl-form__content">
                    {children}
                </div>
            </FormContext.Provider>
        </form>
    )
}

export default Form