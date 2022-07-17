import {BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom'


const Home = (props) => {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

const ProductDetail = (props) => {
    const params = useParams()
    return (
        <div>
            <h1>Product Detail: {params.id}</h1>
        </div>
    )
}

const Product = (props) => {
    return (
        <div>
            <h1>Product</h1>
            <Link to="/product/123">商品详情</Link>
            <Outlet />
        </div>
    )
}

const NotFound = (props) => {
    return (
        <div>
            <h1>Not Found</h1>
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
                        <Route path='product' element={<Product />}>
                            <Route path=':id' element={<ProductDetail/>} />    
                        </Route>
                        <Route path='*' element={<NotFound/>} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}


export default ReactRouterPage
