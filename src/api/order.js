//api calls to add orders, and to clear order history for user

import { createHeaders } from "."
const apiUrl = process.env.REACT_APP_API_URL


//patch to update existing record, only the changed part (orders). 
//Note the nice spread operator in the body that adds the new order to the array of existing orders
export const orderAdd = async (user, newOrder) => {
    try {
            const response = await fetch(`${apiUrl}/${user.id}`, {
                method: 'PATCH',
                headers: createHeaders(),
                body: JSON.stringify({
                    orders: [...user.orders, newOrder]
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

