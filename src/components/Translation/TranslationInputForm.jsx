import { useForm } from "react-hook-form"
import { useState } from "react"

const OrdersForm = ({onOrder}) => {

    const translationInputConfig = {
        required: true,
        maxLength: 40,
    }

    //include the apierror local state thing from LoginForm too
    const {register, handleSubmit, formState: {errors}} = useForm()

    const [translating, setTranslating] = useState(false)
    const [loading, setLoading] = useState(false)


    //passes the orderNotes collected below (which are responsive) on up to the props function this comp got from its parent
    const onSubmit = async ({translationInput}) => {
        setTranslating(true)   
        await onOrder(translationInput) //await because i will add api call in parent onOrder function 
        setTranslating(false)
    }

    //render any input errors to the screen. is called on every re-render and then re-checks if any error messages exist.
    const showErrorMessage = (() => {
        if (!errors.translationInput){
            return null
        }
        if (errors.translationInput.type === 'required'){
            return <span>Translation input is required</span>
            
        }
        if (errors.translationInput.type === 'maxLength'){
            return <span>Can only translate 40 characters at a time.</span>
        }
    })()

    return (
       
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label htmlFor="translationInput">Add text here to translate</label>
                <input type='text' {...register('translationInput', translationInputConfig)} placeholder="Your translation here"/>   
            </fieldset>

            <button type="submit" disabled={translating}>Translate</button>
            
            {translating && <p>Translating...</p>}
            {showErrorMessage}
        </form>
    )
}

export default OrdersForm