
import PropTypes from 'prop-types'; // Import PropTypes
import styles from './ProductItem.module.scss';

const ShipmentProductItem = (props) => {
  return (
    <tr className={styles.Item}>
      <td>{props.item.productid}</td>
      <td>{props.item.productname}</td>

      <td>{props.item.quantityreceived}</td>
      <td>{props.item.cost}</td>
      <td>{props.item.totalcost}</td>

      <td>{props.item.expirydate}</td>


    </tr>
  )
}

// Define propTypes to validate the props
ShipmentProductItem.propTypes = {
  item: PropTypes.shape({
    productid: PropTypes.string.isRequired,
    productname: PropTypes.string.isRequired,
    quantityreceived: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    totalcost: PropTypes.number.isRequired,


    expirydate: PropTypes.string.isRequired,


  }).isRequired,
};

export default ShipmentProductItem;