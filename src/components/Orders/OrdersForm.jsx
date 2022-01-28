import { useForm } from "react-hook-form"

const OrdersForm = ({onOrder}) => {

    const {register, handleSubmit} = useForm()

    //passes the orderNotes collected below (which are responsive) on up to the props function this comp got from its parent
    const onSubmit = ({orderNotes}) => { onOrder(orderNotes)}

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label htmlFor="order-notes">Order notes:</label>
                <input type='text' {...register('orderNotes')} placeholder="No sugar, extra milk etc"/>

                <button type="submit">Order</button>
            </fieldset>
        </form>
    )

}

export default OrdersForm