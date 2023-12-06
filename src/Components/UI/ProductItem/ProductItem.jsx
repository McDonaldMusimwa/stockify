
import PropTypes from 'prop-types'; // Import PropTypes
import styles from './ProductItem.module.scss';

const ProductItem = (props) => {
  console.log(props)
    return (
        <tr className={styles.Item}>
           
            <td>{props.item.productname}</td>
            <td>{props.item.productdescription}</td>
            <td>{props.item.quantityreceived}</td>
            <td>{props.item.cost}</td>
            <td>{props.item.totalcost}</td>
            <td>{props.item.datereceived}</td>
            <td>{props.item.expirydate}</td>
    
        </tr>
      )
}

// Define propTypes to validate the props
ProductItem.propTypes = {
    item: PropTypes.shape({
      productid: PropTypes.string.isRequired,
      productname: PropTypes.string.isRequired,
      quantityreceived: PropTypes.number.isRequired,
      cost: PropTypes.number.isRequired,
      totalcost: PropTypes.number.isRequired,
      productdescription: PropTypes.number.isRequired,
      productThreshold: PropTypes.number.isRequired,
      expirydate: PropTypes.string.isRequired,
      datereceived: PropTypes.string.isRequired,

    }).isRequired,
  };

export default ProductItem