// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "../utils/react-redux";

const ReduxReactHooksPage = (props) => {
    const value = useSelector(({value}) => value)
    const dispatch = useDispatch()
    const increase = () => dispatch({type: 'increase'})
    const decrease = () => dispatch({type: 'decrease'})
    return (
        <div className="redux__container">
            <input className="redux__input" value={value} />
            <div>
                <button className="redux__btn redux__btn--add-btn" onClick={increase}>同步加</button>
                <button className="redux__btn redux__btn--add-btn" onClick={decrease}>同步减</button>
            </div>
        </div>
    )
}

export default ReduxReactHooksPage