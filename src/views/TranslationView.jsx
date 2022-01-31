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

//this code is outside the component to avoid redeclarations when the comp re-renders. goes in array so we can use map() and only write the event handler once
const COFFEES = [ //use this as baseline for the sign language image handlign?
    {
        id:1,
        name: 'Americano',
        image: "img/1.png"
    },
    {
        id:2,
        name: 'Cappucino',
        image: "img/2.png"
    },
    {
        id:3,
        name: 'Latte',
        image: "img/3.png"
    },
    {
        id:4,
        name: 'Espresso',
        image: "img/4.png"
    },
]

const TranslationView = () => {
    
    //local store to contain the chosen coffee - so it can be responsive and update the page showing "you're buying x coffee"
    const [coffee, setCoffee] = useState(null)

    //local state for errors in api call
    const [apiError, setApiError] = useState(null)

    //getting user from the custom hook made in usercontext - passed to the api patch call in handleOrderClicked
    const {user, setUser} = useUser()
    
    //event handler for the order button in OrdersForm child. creates a complete order and http's it off
    const handleTranslateClicked = async translationInput => {
        // if (!coffee){
        //     alert('Please select a coffee')
        //     return
        // }
        const [error, updatedUser] = await orderAdd(user, translationInput)
        console.log(updatedUser)
        if (error !== null){
             return
        }
        //sync local knowledge of translations with api
        setUser(updatedUser)
        storageSave(STORAGE_KEY_USER, updatedUser)
        
    }


    //event handler for each child component being clicked
    const handleCoffeeClicked = (coffeeId) => {
            console.log(coffeeId)
            //finding the entry in the COFFEES constant that has the same id as the one received by this function from a child comp
            //... then setting that as the local store of coffee
            setCoffee(COFFEES.find(coffee => coffee.id === coffeeId))
            
        }

        //note how we pass a handler function as a prop, to be destructured in the child and called from there
    const availableCoffees = COFFEES.map(coffee => {
        return <OrderCoffeeButton 
        key={coffee.id}
        coffee = {coffee}
        image={coffee.image}
        onSelect = {handleCoffeeClicked}/>
    })

    return (
        <>
            <h1>Orders</h1>
            <section id="coffee-options">
                {availableCoffees}
            </section>
            <section id='translate-input'>
                <TranslationInputForm translateHandler={handleTranslateClicked} />
                {apiError && <p>{apiError}</p>}
            </section>

            {/* consider making an && check for this to appear */}
            <section>
                <TranslationOutput/>
            </section>
        </>
    )
}

//wraps the Order view in the withAuth higher-order-component to check if user is logged in before showing this view
export default withAuth(TranslationView)