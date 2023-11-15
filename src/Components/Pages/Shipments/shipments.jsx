

import styles from './shipments.module.scss';
import ShipmentReport from './shipmentreport/shipmentReport';

const shipments = () => {
  return (
    <div 
    className={styles.Shipments}>

        <ShipmentReport />
    </div>
  )
}

export default shipments