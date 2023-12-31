import OveralHistory from "./History/OveralHistory";
import InventoryReport from "./InventoryReport/InventoryReport";
import styles from './Inventory.module.scss';

const Inventory = () => {

  return (
    <div className={styles.Home}>
      <OveralHistory />
      <InventoryReport />
    </div>
  )
}

export default Inventory