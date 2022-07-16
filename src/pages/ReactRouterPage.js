import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


const Home = (props) => {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

const Product = (props) => {
    return (
        <div>
            <h1>Product</h1>
        </div>
    )
}


export default ReactRouterPage = (props) => {
    return (
        <div className="react-router-page">
            <Router>
                <Routes>
                    <Route index element={Home}></Route>
                </Routes>
            </Router>
        </div>
    )
}
