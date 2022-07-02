import Form from '../components/Form'

const FormPage = (props) => {
    return (
        <Form>
            <Form.Field name="account" label="账号">
                <input />
            </Form.Field>
            <Form.Field name="password" label="密码">
                <input />
            </Form.Field>
            <Form.Field>
                <button htmltype="submit">提交</button>
            </Form.Field>
        </Form>
    )
}

export default FormPage