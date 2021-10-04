/*global chrome*/
/* eslint-disable no-undef */
import React, { useState, useContext, useEffect } from 'react'
export const AppContext = React.createContext(null)

export function AppProvider({ children, ...rest }) {
    let currentTheme = "light";
    const [history, setHistory] = useState([])
    const [theme, setTheme] = useState(false)

    useEffect(() => {
        chrome.storage.local.get('theme', (thm) => {
            let tm = thm.theme ? thm.theme : currentTheme
            setTheme(tm)
            document.body.classList.add(tm);
        });
    }, [])

    const loadHistory = (string = "", nResults = 10) => {
        chrome.history.search({ text: string, startTime: 0, maxResults: nResults }, (history) => {
            setHistory(history)
        })
    }

    const switchTeme = () => {
        let newTheme = theme === "light" ? "dark" : "light"
        document.body.classList.add(newTheme);
        document.body.classList.remove(theme);
        chrome.storage.local.set({ 'theme': newTheme });
        setTheme(newTheme)
    }

    const options = {
        history,
        loadHistory,
        theme,
        switchTeme
    }
    return (
        <AppContext.Provider value={options}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const value = useContext(AppContext)
    return value
}