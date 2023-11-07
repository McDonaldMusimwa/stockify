import { useEffect, useState } from 'react';
import styles from './OveralHistory.module.css';
import Card from '../../../UI/Card';
import Category from './Category';
import TotalProducts from './TotalProducts';
import TopSelling from './TopSelling';
import LowStocks from './LowStocks';

const OveralHistory = () => {
  const [stock, setStock] = useState([]);
  const [totalCount, settotalCount] = useState(0);
  const [length, setLength] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect((

  ) => {
    fetch('https://inventorymanagement-7i2p.onrender.com/order/')
      .then((response) => response.json())
      .then((data) => {



        setOrders(data);

      })
  }, [])

  useEffect(() => {
    fetch('https://inventorymanagement-7i2p.onrender.com/stock/')
      .then((response) => response.json())
      .then((data) => {
        let totalCost = 0; // Initialize totalCost to 0
        let totalCount = 0
        // Iterate through the data array to calculate the total cost
        data.forEach((element) => {
          totalCost += element.totalcost;
          totalCount += element.totalquantity
        });
        setLength(data.length)
        setStock(totalCost);
        settotalCount(totalCount)
      });
  }, []);

  return (
    <Card className={styles.Home}><h3>OveralHistory</h3>
      <div className={styles.Home2}>
        <Category length={length} />
        <TotalProducts TotalCost={stock} totalCount={totalCount} />
        <TopSelling order={orders} />
        <LowStocks />
      </div>

    </Card>
  )
}

export default OveralHistory