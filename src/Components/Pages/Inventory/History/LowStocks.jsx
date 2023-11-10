//import  from 'react'
import styles from './TotalProducts.module.css'

const LowStocks = (props) => {
    //console.log(props.stock)
    const products = props.stock
    const isLowStock = (product, threshold = 10) => {
        const totalQuantity = product.totalquantity;
    
        // Calculate the total quantity including shipments
        const totalReceived = product.shipments.reduce((acc, shipment) => acc + shipment.quantityreceived, 0);
        const totalWithShipments = totalQuantity + totalReceived;
    
        return totalWithShipments < threshold || totalQuantity < threshold;
      };
    
      // Function to calculate the total cost of low stock products
      const calculateLowStockCost = (inventory, threshold) => {
        const lowStocks = (inventory || []).filter((product) => isLowStock(product, threshold));
        return lowStocks.reduce((acc, product) => acc + product.totalcost, 0);
      };
    
      // Calculate the total cost of low stock products
      const lowStockCost = calculateLowStockCost(products, 10);
    
      // Get low stock products
     


    return (
        <div className={styles.TotalProducts}>LowStocks
            <div className={styles.Figures}>
                <span className={styles.span2}>10</span>
                <span className={styles.span2}>$ {lowStockCost}</span>
            

                <span className={styles.span}>last 7days</span>
                <span className={styles.span}>Cost</span>
            </div>
        </div>
    )
}

export default LowStocks