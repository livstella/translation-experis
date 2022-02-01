import {createHeaders} from './index'
const apiUrl = process.env.REACT_APP_API_URL

//api calls to check user's existence, create new one, login

const checkForUser = async (username) => {
    try {
        const response = await fetch(`${apiUrl}?username=${username}`)
        if (!response.ok){
            throw new Error('Could not complete request')
        }
        const data = await response.json()
        return [ null, data ]
    }
    catch (error){
        return [error.message, []]
    }
}

const createUser = async (username) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                //NN left orders here to avoid messing up the login page for now. remove them later
                // orders: [],
                translations: []
            })
        })
        if (!response.ok){
            throw new Error('Could not create user ' + username )
        }
        const data = await response.json()
        return [ null, data ]
    }
    catch (error){
        return [error.message, []]
    }

}

//logs in by checking if user exists, and if so returning user.pop() (taking user obj out of the return array), otherwise continuing to create new user at the end
export const loginUser = async (username) => {
    const [checkError, user] = await checkForUser(username)
    if (checkError !== null){
        return [checkError, null]
    }
    if (user.length > 0){
        return [null, user.pop()]
    }

    return await createUser(username)
} 


//get user with certain id - note that (for this api) the return type when adding /--userid-- to the url is NOT an array of obj, just an obj, so no need for pop()
export const userById = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/${userId}`)
        if (!response.ok){
            throw new Error('could not fetch user')
        }
        const user = await response.json()
        return [null, user]
    }
    catch(error){
        return [error.message, null]
    }
}