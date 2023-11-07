//import  from 'react'
import styles from './TotalProducts.module.css'

const LowStocks = () => {
    return (
        <div className={styles.TotalProducts}>LowStocks
            <div className={styles.Figures}>
                <span className={styles.span2}>10</span>
                <span className={styles.span2}>$2500</span>
            

                <span className={styles.span}>last 7days</span>
                <span className={styles.span}>Cost</span>
            </div>
        </div>
    )
}

export default LowStocks