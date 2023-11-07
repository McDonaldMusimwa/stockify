//import React from 'react';
import ProductItem from "./ProductItem/ProductItem";
import styles from './ViewProductModal.module.scss';
import PropTypes from 'prop-types';
const ViewProductModal = (props) => {
   
   
    return (


        <div className={styles.backdrop} onClick={props.onClose}>
            <div className={styles.Modal}>
                <div className={styles.Home}>

                    <table>
                        <thead >
                            <tr>
                                
                                <th>ProductName</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>CaseCost</th>
                                <th>TotalCost</th>
                                <th>Datereceived</th>
                                <th>ExpiryDate</th>
                                
                            </tr>
                        </thead>




                        <tbody>
                            {props.shipments.map((item) => (
                                <ProductItem key={item._id} item={item} />
                            ))}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    )
}


ViewProductModal.propTypes = {
    onClose: PropTypes.func.isRequired, // Assuming onClose is a function
    shipments: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            productname: PropTypes.string.isRequired,
            productdescription: PropTypes.string.isRequired,
            quantityreceived: PropTypes.number.isRequired,
            cost: PropTypes.number.isRequired,
            totalcost: PropTypes.number.isRequired,
            datereceived: PropTypes.string.isRequired,
            expiryDate: PropTypes.string.isRequired, // Make sure the property name matches what you receive
        })
    ).isRequired,
};

export default ViewProductModal