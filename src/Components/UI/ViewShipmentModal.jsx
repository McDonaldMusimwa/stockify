//import React from 'react';
import ProductItem from './ProductItem/shipmentProductItem';
import styles from './ViewProductModal.module.scss';
import PropTypes from 'prop-types';

const ViewShipmentModal = (props) => {
    // Ensure orders is an array and not undefined
    
    const orderItems = props.shipments;
  
    
    return (
        <div className={styles.backdrop} onClick={props.onClose}>
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
                            {orderItems.map((item) => (
                                
                                <ProductItem key={item._id} item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

ViewShipmentModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    shipments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            productname: PropTypes.string.isRequired,
            productdescription: PropTypes.string.isRequired,
            quantityreceived: PropTypes.number.isRequired,
            cost: PropTypes.number.isRequired,
            totalcost: PropTypes.number.isRequired,
            datereceived: PropTypes.string.isRequired,
            expiryDate: PropTypes.string.isRequired,
        })
    ),
};

export default ViewShipmentModal;
