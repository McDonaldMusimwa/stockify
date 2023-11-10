
import PropTypes from 'prop-types'; // Import PropTypes
import styles from './OrderItem.module.scss';

const OrderItem = (props) => {
    return (
        <tr className={styles.Item}>
             <td>{props.item.productId}</td>
            <td>{props.item.productname}</td>
            
            <td>{props.item.quantity}</td>
       
    
        </tr>
      )
}

// Define propTypes to validate the props
OrderItem.propTypes = {
    item: PropTypes.shape({
      productId: PropTypes.string.isRequired,
      productname: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
   
    }).isRequired,
  };

export default OrderItem