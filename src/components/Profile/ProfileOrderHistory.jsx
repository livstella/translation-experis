import ProfileOrderHistoryItem from "./ProfileOrderHistoryItem"

const ProfileOrderHistory = ( {orders}) => {
//orders is a list of strings that we destructure from the props object above

//makes an array of jsx elements of the type ProfileOrderHistoryItem for each of the order strings.
const orderList = orders.map((order, index) => <ProfileOrderHistoryItem key={index + '-' + order} order={order}/>)

    return (
        <section>
            <h4>Your order history</h4>

            {orderList.length === 0 && <p>You have no orders yet</p>}
                <ul>
                    {orderList }
                </ul>
        </section>
    )
}

export default ProfileOrderHistory