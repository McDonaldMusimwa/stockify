import  { useState, useEffect } from 'react';
//import Card from '../UI/Card';
//import coins from '/assets/coins.png'
import coins from './assets/coins.png'
import revenue from './assets/revenue.png'
import moneygrowth from './assets/money-growth.png'
import steprevenue from './assets/steprevenue.png'
import styles from './SalesOverViews.module.css';
import { ChartComponent } from './ChartCombonent/ChartComponent';

const SalesOverViews = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://inventorymanagement-7i2p.onrender.com/order/') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  //console.log(data)
  /*
  const data = [
    {
      figure: 3000,
      sales: 'sales',
      imoji: icon,
    },
    {
      figure: 18300,
      sales: 'Revenue',
      imoji: icon,
    },
    {
      figure: 3000,
      sales: 'Profit',
      imoji: icon,
    },
    {
      figure: 4000,
      sales: 'Cost',
      imoji: icon,
    },
  ];
*/
  return (
    <div className={styles.Sales}>
      <div className={styles.Sales}>
        <h2>SalesOverViews</h2>
        <div className={styles.SalesContainer}>

          <ChartComponent icon={coins} figure={data.length} alt={"Orders"} category={"Orders"}/>
          <ChartComponent icon={revenue} figure={data.length} alt={"Orders"} category={"revenue"}/>
          <ChartComponent icon={steprevenue} figure={data.length} alt={"Orders"} category={"stock"}/>
          <ChartComponent icon={moneygrowth} figure={data.length} alt={"Cost"} category={"Cost"}/>

        </div>
      </div>
    </div>
  );
};

export default SalesOverViews;
