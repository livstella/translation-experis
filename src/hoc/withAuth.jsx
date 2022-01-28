//file to check if user is logged in and otherwise redir them away from /profile
//to protect routes
import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"


//HOC = higher order component. 
const withAuth = Component => props => {
    const {user} = useUser()
    //if has user, return the expected view component, such as /profile
    if (user !== null){
        return <Component {...props}/>
    } else {
        //if not has user, return a Navigate to '/'
        return <Navigate to='/' />
    }
}

export default withAuth