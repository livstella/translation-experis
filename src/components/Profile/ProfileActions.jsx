

//Link component provided by react router to allow routing
import { Link } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import { storageDelete, storageSave } from "../../utils/storage"
import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { orderClearHistory } from "../../api/order"
import { clear } from "@testing-library/user-event/dist/clear"

const ProfileActions = () => {

    //getting curr user from context using my useUser hook - to pass as prop to ProfileHeader below, and use in event handlers like for clearing history
    const { user, setUser } = useUser()

    //handler for logging out
    const handleLogoutClick = () => {
    if(window.confirm('Are you sure?')) {
        //first delete the user in the local storage, then...
        storageDelete(STORAGE_KEY_USER)
        //... set user to null in the state too - userdata is persistent in the api, so we can safely remove it in these places
        setUser(null)
        }
    }   

    //handler for clearing order history
    const handleClearHistory = async () => {
        if (!window.confirm('Are you sure?\n This can not be undone')){
            return
        }

        const [clearError] = await orderClearHistory(user.id)

        if (clearError !== null){
            return
        }

        //note use of spread operator with setter to retain the existing user info, except whatever gets redeclared afterwards, in this case orders
        const updatedUser = {
            ...user,
            orders: []
        }
        setUser(updatedUser)
        storageSave(STORAGE_KEY_USER, updatedUser)
    }

    return (
        <ul>
            <li><Link to='/translations'>TRANSLATIONS</Link></li>
            <li><button onClick={handleClearHistory}>Clear history</button></li>
            <li><button onClick={handleLogoutClick}>Logout</button></li>
        </ul>
    )
}

export default ProfileActions