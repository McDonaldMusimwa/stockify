//import  from 'react'
import styles from './TotalProducts.module.css'

const TopSelling = (props) => {
    
    const orders = props.order
    
// Define an object to store the total quantity for each product
const totalQuantityByProduct = {};

// Filter orders for September 2023
const septemberOrders = orders.filter((order) => {
  const orderDate = new Date(order.dateordered);
  return orderDate.getMonth() === 8 && orderDate.getFullYear() === 2023; // Note: JavaScript months are zero-based (0 = January, 8 = September)
});

// Calculate the total quantity for each product
septemberOrders.forEach((order) => {
  order.products.forEach((product) => {
    const productId = product.productId;
    const quantity = product.quantity;

    // Update the total quantity for the product
    if (totalQuantityByProduct[productId]) {
      totalQuantityByProduct[productId] += quantity;
    } else {
      totalQuantityByProduct[productId] = quantity;
    }
  });
});

// Convert the total quantities into an array
const totalQuantitiesArray = Object.keys(totalQuantityByProduct).map((productId) => ({
  productId,
  totalQuantity: totalQuantityByProduct[productId],
}));

// Sort the array by total quantity in descending order
totalQuantitiesArray.sort((a, b) => b.totalQuantity - a.totalQuantity);

// Extract the total quantities in the desired format
const totalQuantities = totalQuantitiesArray.map((item) => item.totalQuantity);


    return (
        <div className={styles.TotalProducts}>Orders
            <div className={styles.Figures}>
                <span className={styles.span2}>{orders.length}</span>
                <span className={styles.span2}>${totalQuantities}</span>
            

                <span className={styles.span}>last7days</span>
                <span className={styles.span}>Cost</span>
            </div>
        </div>
    )
}

export default TopSelling