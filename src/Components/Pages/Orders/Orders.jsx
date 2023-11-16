import OrderReport from './OrderReport/OrderReport';
import styles from './Orders.module.scss';

const Orders = () => {
  return (
    <div className={styles.Home}>

    <OrderReport />
    </div>
  )
}

export default Orders