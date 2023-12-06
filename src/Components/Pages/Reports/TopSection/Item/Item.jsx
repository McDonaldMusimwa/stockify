import styles from './Item.module.scss';
import PropTypes from 'prop-types'

const Item = (props) => {
  return (
    <tr 
    className={styles.Item}>

        <td >{props.productName}</td>
        <td >{props.quantity}</td>
        <td >{props.Increase} %</td>
    </tr>
  )
}
Item.propTypes = {
    
     
      productName: PropTypes.string.isRequired,
      Increase: PropTypes.string.isRequired,
      quantity:PropTypes.string.isRequired
     
  
  };
export default Item