import OrderCoffeeButton from "../components/Translation/OrdersCoffeeButton"
import withAuth from "../hoc/withAuth"
import TranslationInputForm from "../components/Translation/TranslationInputForm"
import { useState } from "react"
import { useUser } from "../context/UserContext"
import { orderAdd } from "../api/order"
import { storageSave } from "../utils/storage"
import { STORAGE_KEY_USER } from "../const/storageKeys"
import OrdersSummary from "../components/Translation/OrdersSummary"
import TranslationOutput from "../components/Translation/TranslationOutput"
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils"

const TranslationView = () => {

    //local state for errors in api call
    const [apiError, setApiError] = useState(null)

    //getting user from the custom hook made in usercontext - passed to the api patch call in handleOrderClicked
    const {user, setUser} = useUser()
    
    //event handler for the order button in OrdersForm child. creates a complete order and http's it off
    const handleTranslateClicked = async translationInput => {
        const [error, updatedUser] = await orderAdd(user, translationInput)
        if (error !== null){
            setApiError(error)
             return
        }
        //sync local knowledge of translations with api
        setUser(updatedUser)
        storageSave(STORAGE_KEY_USER, updatedUser)
    }

    return (
        <>
            <h1>Orders</h1>
            <section id='translate-input'>
                <TranslationInputForm translateHandler={handleTranslateClicked} />
                {apiError && <p>{apiError}</p>}
            </section>

            <section>
                <TranslationOutput/>
            </section>
        </>
    )
}

//wraps the Order view in the withAuth higher-order-component to check if user is logged in before showing this view
export default withAuth(TranslationView)