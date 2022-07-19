import React, { useEffect, useMemo } from "react"


const createRoutesFormChildren = (children) => {
    let routes = []
    React.Children.forEach(children, (child) => {
        const { path, element, children} = child.props
        let route = {
            path,
            component: element,
            children: createRoutesFormChildren(children)
        }
        routes.push(route)
    })
    return routes
}


export const BrowserRouter = (props) => {
    const { children } = props
    return children
}

export const Routes = (props) => {
    const { children } = props
    const routes = createRoutesFormChildren(children)
    const matchedRoute = useRoutes(routes)
    return matchedRoute?.component ?? null
}

const useRoutes = (routes) => {
    const path = window.location.pathname
    return routes.map((route) => path === route.path && route.component)
}

export const Route = (props) => {
    const { children, element } = props
    return element ?? children
}