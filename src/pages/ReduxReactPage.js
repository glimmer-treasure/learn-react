import { Component } from "react";
import { connect } from "../utils/react-redux";
import { bindActionCreators } from "../utils/Redux";

export default connect(({value}) => {
    return {value}
},
(dispatch) => {
    let creators = {
        increase: () => ({type: 'increase'}),
        decrease: () => ({type: 'decrease'})
    }
    creators = bindActionCreators(creators, dispatch)
    return creators
})(
    class ReduxReactPage extends Component {
        render() {
            const {value, increase, decrease} = this.props
            return (
                <div className="redux__container">
                    <input className="redux__input" value={value} />
                    <div>
                        <button className="redux__btn redux__btn--add-btn" onClick={increase}>同步加</button>
                        <button className="redux__btn redux__btn--add-btn" onClick={decrease}>同步减</button>
                        {/* <button className="redux__btn redux__btn--add-btn" onClick={asyncIncrease}>异步加</button>
                        <button className="redux__btn redux__btn--add-btn" onClick={promiseIncrease}>Promise加</button> */}
                    </div>
                </div>
            )
        }
    }
)