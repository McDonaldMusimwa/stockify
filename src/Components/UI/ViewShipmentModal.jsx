
import PropTypes from 'prop-types';
import ProductItem from './ProductItem/shipmentProductItem';
import styles from './ViewProductModal.module.scss';

const ViewShipmentModal = (props) => {
    const { shipments, onClose } = props;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.Modal}>
                <div className={styles.Home}>
                
                    <table>
                        <thead>
                            <tr>
                                <th>productid</th>
                                <th>productname</th>
                                <th>quantity</th>
                                <th>cost</th>
                                <th>totalcost</th>
                                <th>expiry date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((item) => (
                                <ProductItem key={item._id} item={item} />
                            ))}
                            
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

ViewShipmentModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    shipments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            productname: PropTypes.string.isRequired,
            
            quantityreceived: PropTypes.number.isRequired,
            cost: PropTypes.number.isRequired,
            totalcost: PropTypes.number.isRequired,
           
            expiryDate: PropTypes.string.isRequired,
        })
    ),
};

export default ViewShipmentModal;
