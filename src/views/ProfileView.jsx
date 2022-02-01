import { useEffect } from "react"
import { userById } from "../api/user"
import ProfileActions from "../components/Profile/ProfileActions"
import ProfileHeader from "../components/Profile/ProfileHeader"
import ProfileOrderHistory from "../components/Profile/ProfileOrderHistory"
import { STORAGE_KEY_USER } from "../const/storageKeys"
import { useUser } from "../context/UserContext"
import withAuth from "../hoc/withAuth"
import { storageSave } from "../utils/storage"

const ProfileView = () => {

    //getting curr user from context using my useUser hook - to pass as prop to ProfileHeader and OrderHistory below, and use in useEffect to set user
    const { user, setUser } = useUser()

    //useEffect hook runs on mount and when user obj is updated. Used to update the local state and local storage versions of "orders" by asking the api if there has been an update - otherwise won't show new orders until after logout and login again
    //Note the nested function because useEffect itself cannot be async, but can still run async code inside itself
    //checks if current user with x id can be found in api, then updates user in state and local storage if appropriate
    useEffect(() => {
        //NOTE this func is left out for now because it caused repeated api calls each time Profile mounted, better to use session > local storage. session is destroyed when tab is closed.
        const findUser = async () => {
            const [error, latestUser] = await userById(user.id)
            if (error === null){
                storageSave(STORAGE_KEY_USER, latestUser)
                setUser(latestUser)
            }
        }

        //findUser()
    }, [setUser, user.id])

    return (
        <>
            <h1>Profile</h1>
            <ProfileHeader username={user.username}></ProfileHeader>
            <ProfileActions></ProfileActions>
            {/* NN edited below to be translations to allow logging in without errors */}
            <ProfileOrderHistory orders={user.translations}></ProfileOrderHistory>
        </>
        
    )
}

//wraps the Profile view in the withAuth higher-order-component to check if user is logged in before showing this view
export default withAuth(ProfileView)