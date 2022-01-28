const OrderCoffeeButton = ({coffee, onSelect}) => {
    return (
        //here the function passed as prop from Orders is added as event handler, which will be emitted up to Orders on click with the unique ID of this coffee
        //note the arrow syntax to be able to pass in argument into the callback
        <button onClick={() => onSelect(coffee.id)}>
            <aside>
                <img src={coffee.image} alt={coffee.name} width='55'/>
            </aside>
            <section>
                <b>{coffee.name}</b>
            </section>
        </button>
    )
}

export default OrderCoffeeButton