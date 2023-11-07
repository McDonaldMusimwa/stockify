import BestSellingCategory from './TopSection/BestSellingCategory';
import OverView from './TopSection/OverView';
import ProfitRevenue from './BottomSection/ProfitRevenue';
import BestSellingProducts from './BottomSection/BesSellingProduct';
import styles from './Reports.module.css';

const Reports = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.HomeTope}>
        <OverView />
        <BestSellingCategory/>
      </div>
        <ProfitRevenue />
        <BestSellingProducts />
        </div>
  )
}

export default Reports