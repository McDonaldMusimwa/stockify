//import React from 'react';

import styles from './SupplierStatusModal.module.scss'
import PropTypes from 'prop-types';


const OrderStatusModal = (props) => {


    return (
        <div className={styles.backdrop} onClick={props.onclose}>
            <div className={styles.Modal}>
                <header className={styles.header}>
                    <h2>Order {props.action}</h2>
                </header>

                <div className={styles.content}>{props.name} has been submitted </div>
               
            </div>
        </div>
    );
}

OrderStatusModal.propTypes = {
    onclose:PropTypes.func.isRequired,
    action:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
};

export default OrderStatusModal;
