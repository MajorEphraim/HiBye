import React, {useState, createContext} from "react";

export const RequestsContext = createContext()

export const RequestsProvider =({ children })=>{
    const [people, setPeople] = useState([])

    const [isLoading, setIsLoading] = useState(null)

    const updatePeople = (people)=>{

        setPeople(people)
        setIsLoading(false)
    }

    return (
        <RequestsContext.Provider value={{people, isLoading, updatePeople }}>
            {children}
        </RequestsContext.Provider>
    )
}