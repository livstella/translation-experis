
//component to show summary of order after order has been delivered
const OrdersSummary = ({coffee}) => {
  return (
  <section>
      <h4>Order summary</h4>
      <div>
          <img src={coffee.image} alt={coffee.name} width='55'/>
      </div>
      <p>You are ordering a {coffee.name}</p>
  </section>)
};

export default OrdersSummary;
