
//NOTE for developing the translation part of translations: maybe naming the .pngs with numbers and then recycling something from the 
//ascii-value based caeser cypher solution can be a neat way to pick the right images?

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
