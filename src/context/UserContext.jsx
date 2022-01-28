import { createContext, useContext, useState } from "react"
import { STORAGE_KEY_USER } from "../const/storageKeys"
import { storageRead } from "../utils/storage"

//Context object -> exposes state values with the below useUser function
const UserContext = createContext()

    //custom hook, this exposes the context
export const useUser = () => {
    return useContext(UserContext) //returns {user, setUser} and what else i put in state{}
}

//Provider -> manages state. This is a regular react component
const UserProvider = ({children}) => { // <- this is children object destructured from props

    //sets user to what local storage has recorded under 'coffee-user' key, or the default return of my storageRead in storage.js which is null
    const [user, setUser] = useState(storageRead(STORAGE_KEY_USER))

    const state = {
        user,
        setUser
    }
    //"value" below is what you want to expose from here: both functions and vars
    return (
        <UserContext.Provider value={state}>  
            {children}
        </UserContext.Provider>
    )
}

    //this exposes the provider
export default UserProvider