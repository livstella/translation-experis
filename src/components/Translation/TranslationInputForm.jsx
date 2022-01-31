import { useForm } from "react-hook-form"
import { useState } from "react"
import { userById } from "../../api/user"
import { useUser } from "../../context/UserContext"
import { useLatestTranslation } from "../../context/LatestTranslationContext"

const TranslationInputForm = ({translateHandler}) => {

    const translationInputConfig = {
        required: true,
        maxLength: 40,
    }

    //form handler for translation input
    const {register, handleSubmit, formState: {errors}} = useForm()

    //handles showing the user that a translation is on the way
    const [translating, setTranslating] = useState(false)

    //context for getting and setting just the latest translation
    const {latestTranslation, setLatestTranslation} = useLatestTranslation()

    //passes translation input upwards to parent for use in the translateHandler prop function
    const onSubmit = async ({translationInput}) => {
        setTranslating(true)   
        await translateHandler(translationInput)
        setTranslating(false)
        setLatestTranslation(translationInput)
    }

    //render any user input errors to the screen. is called automatically on every re-render and then re-checks if any error messages exist.
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

export default TranslationInputForm