//single order item displaying the order it represents
const ProfileOrderHistoryItem = ({order}) => {
    //NN edited the below to say order.text instead of order to accomodate for the translation data format {text: text, isDeleted: true/false}
    return (<li>{order.text}</li>)

}

export default ProfileOrderHistoryItem