/*global chrome*/
/* eslint-disable no-undef */
import React, { useState, useContext, useEffect } from 'react'
export const AppContext = React.createContext(null)

export function AppProvider({ children, ...rest }) {
    const [history,setHistory] = useState([])

    const loadHistory = (string="",nResults=10)=>{
        chrome.history.search({text: string,startTime : 0,maxResults : nResults},(history)=>{
            setHistory(history)
        })
    }

    const options={
        history,
        loadHistory
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