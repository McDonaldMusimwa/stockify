
import styles from './OrderItem.module.scss';
import PropTypes from 'prop-types'; // Import PropTypes
const OrderItem = (props) => {

  const numberofproducts = props.item.products.length;



  return (
    <tr className={styles.Item} onClick={props.onClick}>

      <td>{props.item._id}</td>
      <td>{props.item.customername}</td>
      <td>{props.item.dateordered}</td>
      <td>{numberofproducts}</td>


    </tr>
  )
}
OrderItem.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    customername: PropTypes.string.isRequired,
    dateordered: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string.isRequired,
        productname: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        // ... other properties of each product
      })
    ).isRequired,
  }).isRequired,
};

export default OrderItem