
import styles from './InventoryItem.module.scss';
import PropTypes from 'prop-types'; // Import PropTypes
const InventoryItem = (props) => {



    
  return (
    <tr className={styles.Item} onClick={props.onClick}>
        
        <td>{props.item.productID}</td>
        <td>{props.item.productname}</td>
        <td>{props.item.totalquantity}</td>
        <td>{props.item.totalcost}</td>
        <td>10 cases</td>
        <td>{props.item.totalquantity > 0 ? '✔️' : '✖'}</td>

    </tr>
  )
}

// Define propTypes to validate the props
InventoryItem.propTypes = {
  onClick:PropTypes.func,
  item: PropTypes.shape({
   
    productID: PropTypes.string.isRequired,
    productname: PropTypes.string.isRequired,
    totalcost: PropTypes.number.isRequired,
    totalquantity: PropTypes.number.isRequired,
    productThreshold: PropTypes.number.isRequired,
    productexpiryDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default InventoryItem