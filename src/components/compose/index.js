export const compose = (...funcs) => {
    if (funcs.length < 1) {
        return (...args) => args 
    } else if (funcs.length === 1) {
        return funcs[0]
    } else {
        return funcs.reduce((prev, cur) => {
            return (...args) => prev(cur(...args))
        }, (...args) => args)
    }
}