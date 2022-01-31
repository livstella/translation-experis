//api calls to add orders, and to clear order history for user

import { createHeaders } from "."
const apiUrl = process.env.REACT_APP_API_URL


//patch to update existing record, only the changed part (translations). 
//Note the spread operator in the body that adds the new translation to the array of existing translations
export const orderAdd = async (user, newTranslation) => {
    try {
            const response = await fetch(`${apiUrl}/${user.id}`, {
                method: 'PATCH',
                headers: createHeaders(),
                body: JSON.stringify({
                    //NN left orders here to avoid messing up the login page for now. remove them later
                    orders: [...user.orders],
                    translations: [...user.translations, {
                        text: newTranslation,
                        isDeleted: false}],
                })
            })
            if (!response.ok){
                throw new Error('Could not update the order')
            }
            const result = await response.json()
            return [null, result]
    } catch(error) {
        return [error.message, null]
    }
}

export const orderClearHistory = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                orders: []
            })
        })
        if (!response.ok){
            throw new Error('Could not update the order')
        }
        const result = await response.json()
        return [null, result]
    } catch (error) {
        return [error.message, null]
    }
}

