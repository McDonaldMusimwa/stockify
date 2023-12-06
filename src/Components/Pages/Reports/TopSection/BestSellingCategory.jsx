
import {useState,useEffect} from 'react'
import Card from '../../../UI/Card';
import styles from './BestSellingCategory.module.scss';
import StockItem from './Item/Item';
import FilterBestSellingProducts from '../../../Services/FilterProducts';
const BestSellingCategory = () => {
  const [orders,setOrders]= useState([])
  useEffect((

    ) => {
      fetch('https://inventorymanagement-7i2p.onrender.com/order/')
        .then((response) => response.json())
        .then((data) => {
  
  
          setOrders(data)
  
        })
    }, [])

    const filteredOrders = FilterBestSellingProducts(orders)

 /* const orders = [
    {
      product: 'Forever toothgel',
      increase: 3, key: 1
    }, {
      product: 'Pro Biotic',
      increase: 2, key: 2
    }
  ]*/
  return (
    <Card className={styles.BestSellingCategory}>BestSellingCategory

      <div className={styles.table}>
        <div className={styles.head}>
          <span style={{width:'80px'}}>Product</span>
          <span style={{width:'80px'}}>Quantity </span>
          <span style={{width:'80px'}}>Increase</span>
        </div>
        <>
          
            {filteredOrders.map((Item) => {
              return <StockItem key={Item.key} Increase={Item.percentageIncrease} productName={Item.productName} quantity={Item.totalQuantity} />
            })}
          
        </>
      </div>
    </Card>
  )
}

export default BestSellingCategory