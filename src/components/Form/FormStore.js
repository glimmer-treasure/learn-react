import React, { useRef } from "react"

export class FormStore {
    store = {}
    nameToSubscriber = new Map()
    getFormValues = () => {
        return {
            ...this.store
        }
    }
    getFormValue = (name) => {
        return this.store[name] ?? null
    }
    setFormVale = ({name = '', value = ''}) => {
        const partailStore =  name ? {name, value} : {}
        this.store = {
            ...this.store,
            ...partailStore
        }
        name && this.noticeUpdate(name)
    }
    subscribe = (name, update) => {
        name && this.nameToSubscriber.set(name, update)
        const unsubscribe = () => name && this.nameToSubscriber.delete(name)
        return unsubscribe
    }
    noticeUpdate = (name) => this.nameToSubscriber.get(name)?.()
    getStore = () => ({
        getFormValues,
        getFormValue,
        setFormVale,
        subscribe,
    })
}

export const useForm = () => {
    const ref = useRef(null)
    if (!ref.current) {
        const formStore = new FormStore()
        ref.current = formStore.getStore()
    }
    return [ref.current]
}

export const FormContext = React.createContext()