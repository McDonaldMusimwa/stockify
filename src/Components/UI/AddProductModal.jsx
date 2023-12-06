import styles from './AddProductModal.module.scss';

import PropTypes from 'prop-types';

const AddProductModal = (props) => {

    //console.log(productrange)
    return (


        <div className={styles.backdrop} onClick={props.onClose}>
            <div className={styles.Modal}>
                <header className={styles.header}>
                    <h2>App Product</h2>
                </header>
                <div className={styles.content}>New Product to product range .</div>

            </div>
        </div>
    )
}

export default AddProductModal

AddProductModal.propTypes = {
    onClose: PropTypes.func.isRequired, // Function prop is required
};