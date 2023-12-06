import styles from './DeletedSupplierModal.module.scss'
import PropTypes from 'prop-types';
const DeletedSupplierModal = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.closeModal}>
            <div className={styles.Modal}>
                <header className={styles.header}>
                    <h2>Supplier deleted</h2>
                </header>

                <div className={styles.content}>Supplier has been deleted  </div>
               
            </div>
        </div>
  )
}
DeletedSupplierModal.propTypes = {
    closeModal:PropTypes.func.isRequired,
    
  };
export default DeletedSupplierModal