import {BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'


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

const Layout = (props) => {
    return (
        <div>
            <h1>Layout</h1>
            <Link to='/'>首页</Link>
            <Link to='/product'>商品</Link>
            <Outlet />
        </div>
    )
}

const ReactRouterPage = (props) => {
    return (
        <div className="react-router-page">
            <Router>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='product' element={<Product />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}


export default ReactRouterPage
