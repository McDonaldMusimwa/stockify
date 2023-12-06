//import React from 'react';

import styles from './SupplierStatusModal.module.scss'
import PropTypes from 'prop-types';


const SupplierStatusModal = (props) => {


    return (
        <div className={styles.backdrop} onClick={props.onclose}>
            <div className={styles.Modal}>
                <header className={styles.header}>
                    <h2>Supplier {props.action}</h2>
                </header>

                <div className={styles.content}>Supplier {props.name} has been {props.action} </div>
               
            </div>
        </div>
    );
}

SupplierStatusModal.propTypes = {
    onclose:PropTypes.func.isRequired,
    action:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
};

export default SupplierStatusModal;
