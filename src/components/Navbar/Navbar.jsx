//builtin component from Router that allows navbar links to pages
import { NavLink } from "react-router-dom"
import { useUser } from "../../context/UserContext"

const Navbar = () => {

    const {user} = useUser()

    return (
        <nav>
            <h1>Coffee orders</h1>
            
            {user !== null && <div>Logged in as {user.username}</div>}
            {user !== null && <ul>
                <li>
                    <NavLink to='/translations'>TRANSLATIONS</NavLink>
                </li>
                <li>
                    <NavLink to='/profile'>Profile</NavLink>
                </li>
            </ul>}
        </nav>
    )
}

export default Navbar