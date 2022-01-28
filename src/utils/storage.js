//add, delete and get user in local browser storage
//NOTE: now sessionstorage which is bound to tab, unlike local which persists with browser.
//this forces the website to get latest version of data from heroku api which resets every 30 minutes whereas local might persist beyond that timeframe


//validate that the call has input a key of type string. nice-to-have safeguard.
const validateKey = key => {
    if (!key || typeof key !== 'string'){
        throw new Error('Invalid storage key provided')
    }
}

export const storageSave = (key, value) => {
    validateKey(key)

    if (!value){
        throw new Error('storageSave: no value provided for ' + key)
    }

    sessionStorage.setItem(key, JSON.stringify(value))
}

export const storageRead = (key) => {
    validateKey(key)
   
    const data = sessionStorage.getItem(key)
    if (data){
        return JSON.parse(data)
    }

    return null
}

export const storageDelete = (key) => {
    validateKey(key)
    sessionStorage.removeItem(key)
}