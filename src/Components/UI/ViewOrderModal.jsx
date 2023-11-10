//import React from 'react';
import OrderItem from "./OrderItem/OrderItem";
import styles from './ViewProductModal.module.scss';
import PropTypes from 'prop-types';

const ViewOrderModal = (props) => {
    // Ensure orders is an array and not undefined
    console.log(props)
    const orderItems = Array.isArray(props.products) ? props.products : [];

    return (
        <div className={styles.backdrop} onClick={props.onClose}>
            <div className={styles.Modal}>
                <div className={styles.Home}>
                    <table>
                        <thead>
                            <tr>
                                <th>productid</th>
                                <th>productname</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item) => (
                                <OrderItem key={item._id} item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

ViewOrderModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(
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

export default ViewOrderModal;
