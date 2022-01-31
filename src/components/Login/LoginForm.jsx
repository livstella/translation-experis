import { useForm } from 'react-hook-form'
import {loginUser} from '../../api/user'
import { useState, useEffect } from 'react'
import { storageSave } from '../../utils/storage'
import {useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { STORAGE_KEY_USER } from '../../const/storageKeys'


//input VALIDATION ERROR criteria for the react hook form for username
const usernameConfig = {
    required: true,
    minLength: 3
}

const LoginForm = () => {
    
    //HOOKS - "{x, y} = func()" is destructuring the object that func() returns
    //react hook form for handling the form elegantly with VALIDATION error checking.
    //handleSubmit is react's internal base submit handler, to which i below attach my onSubmit as a callback
    const {register, handleSubmit, formState: { errors }} = useForm()
    
    //Hook to access UserContext
    const {user, setUser} = useUser()

    //Hook for routing
    const navigate = useNavigate()


    //local state - variable name and setter for the way React handles local responsive state
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(null)

    //Side effects - LIFECYCLE HOOKSinto the user variable defined in above setUser hook and reacts to produce a "side effect" when it changes
        //runs at first load and when component re-renders and checks for changes to its dependency (user)
    useEffect(() => {
        if (user !== null){
            navigate('profile')
        }
    }, [ user, navigate ]) //depends on the content of array, which has vars that useEffect wants to check and methods it wants to call
                            //NOTE: blank array means "run at onMount". can also run at onDestroyed etc, or maybe beforeCreated (good for getting data with async  fetch)
  

    //EVENT HANDLERS
    //submits user and lets users.js first get then use that to pick post or patch
    const onSubmit = async ({username}) => {
        setLoading(true)
        const [error, userResponse] = await loginUser(username)
        if (error !== null) { //note 'error' here is the api error from above line
            setApiError(error)
        }
        if (userResponse !== null){
            //add user to local browser storage
            storageSave(STORAGE_KEY_USER, userResponse)
            setUser(userResponse)
        }
        setLoading(false)
    }

    //RENDER FUNCTIONS
    //form input error message object to display to user
    const errorMessage = (() => {
        if (!errors.username){
            return null
        }

        if (errors.username.type === 'required') {
            return <span>Username is required</span>
        }

        if (errors.username && errors.username.type === 'minLength'){
            return <span>Username is too short, min 3 chars.</span>
        }
    })()
    
    //returns the actual component we call LoginForm
    return (
        <div className='login-component'>
            <h2>What's your name?</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-wrapper'>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder='johndoe'
                        {...register("username", usernameConfig)} 
                    />
                    {errorMessage}
                    <button type="submit" disabled={loading}>Continue</button>
                </fieldset>

  
                </div>

                {loading && <p>Logging in...</p>}
                {apiError && <p>{apiError}</p>}
            </form>
        </div>
    )
}

export default LoginForm