import UserProvider from "./UserContext"

//Appcontext has no state of its own because we split out state into smaller parts like UserCOntext so everything doesnt reload when state in Appcontext changes

const AppContext = ({children}) => { // <- this is children object destructured from props
    return (
        <UserProvider>
        {children}
        </UserProvider>
    )
}

export default AppContext