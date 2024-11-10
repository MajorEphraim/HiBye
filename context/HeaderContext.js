import React, { createContext, useState } from "react";

export const HeaderContext = createContext()

export const HeaderProvider = ({children})=>{

    const [openRequest, setOpenRequest] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)
    const [openLogout, setOpenLogout] = useState(false)

    const toggleOpenRequest = ()=>{
        setOpenRequest(!openRequest)
    }

    const toggleOpenOptions = ()=>{
        setOpenOptions(!openOptions)
    }

    const toggleOpenLogout = ()=>{
        setOpenLogout(!openLogout)
    }


    return (
        <HeaderContext.Provider value={{openRequest, openOptions, openLogout, toggleOpenRequest, toggleOpenOptions, toggleOpenLogout}}>
            {children}
        </HeaderContext.Provider>
    )
}