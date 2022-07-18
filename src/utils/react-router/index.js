import React, { useEffect, useMemo } from "react"


const createRoutesFormChildren = (children, parentPath = '/', routesMap = new Map()) => {
    React.Children.forEach(children, (child) => {
        const { props } = child
        const { path = '', element, index } = props
        let actualPath = ''
        if (!index && !path) {
            return
        }
        if (index || path === '/') {
            actualPath = '/'
        } else if (path.startsWith('/')) {
            actualPath = parentPath === '/' ? path : `${parentPath}${path}`
        } else {
            actualPath = parentPath === '/' ? `/${path}` : `${parentPath}/${path}`
        }
        routesMap.set(actualPath, {
            path: actualPath,
            component: element
        })
        createRoutesFormChildren(props.children, actualPath, routesMap)
    })
    return routesMap
}


export const BrowserRouter = (props) => {
    const { children } = props
    return children
}

export const Routes = (props) => {
    const { children } = props
    const routesMap = useMemo(() => createRoutesFormChildren(children), [children])
    const path = window.location.pathname
    const matchedRoute = routesMap.get(path)
    return matchedRoute?.component ?? null
}

export const Route = (props) => {
    const { children, element } = props
    return element ?? children
}