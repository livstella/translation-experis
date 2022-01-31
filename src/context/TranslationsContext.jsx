import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { storageRead } from "../utils/storage";

const TranslationsContext = createContext()

export const useTranslations = () =>{
    return useContext(TranslationsContext)
}

const TranslationsProvider = ({children}) => {

    const [translations, setTranslations] = useState([])

    const state = {
        translations,
        setTranslations
    }

    return (
        <TranslationsContext.Provider value={state}>
            {children}
        </TranslationsContext.Provider>
    )
}

export default TranslationsProvider