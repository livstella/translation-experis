import { createContext, useContext, useState } from "react"
import { STORAGE_KEY_USER } from "../const/storageKeys"
import { storageRead } from "../utils/storage"

//Context object -> exposes state values with the below useUser function
const LatestTranslationContext = createContext()

    //custom hook, this exposes the context
export const useLatestTranslation = () => {
    return useContext(LatestTranslationContext) //returns {user, setUser} and what else i put in state{}
}

//Provider -> manages state. This is a regular react component
const LatestTranslationProvider = ({children}) => { // <- this is children object destructured from props

    //sets last translation to what is recorded in session storage user account
    //consider getting this from the API instead
    const getLastTranslation = () => {
        const currentUser = storageRead(STORAGE_KEY_USER)
        if (currentUser){
            return currentUser.translations.slice(-1)[0]
        }
        return ''     
    }
    
    const [latestTranslation, setLatestTranslation] = useState(getLastTranslation())

    const state = {
        latestTranslation,
        setLatestTranslation
    }
    //"value" below is what you want to expose from here: both functions and vars
    return (
        <LatestTranslationContext.Provider value={state}>  
            {children}
        </LatestTranslationContext.Provider>
    )
}

    //this exposes the provider
export default LatestTranslationProvider