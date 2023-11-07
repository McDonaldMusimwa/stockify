//import React from 'react';

import styles from './Dashboard.module.css';


import SalesOverViews from './Charts/DashboadComponents/SalesOverViews';
import PurchaseSummary from './Charts/DashboadComponents/PurchasesSummary';
import InventorySummary from './Charts/DashboadComponents/InventorySummary';
import ProductSummary from './Charts/DashboadComponents/ProductSummary';
import OrdersVsPurchasesChart from './Charts/DashboadComponents/OrdersVsPurchasesChart';
import OrderSummary from './Charts/DashboadComponents/OrderSummary';
const Dashboard = () => {
  return (
    <div className={styles.DashboardMain}>


      <div className={styles.Dashboard}>
        <div className={styles.CompOne}><SalesOverViews /></div>
        <div className={styles.CompTwo}><InventorySummary /></div>
        <div className={styles.CompThree}><PurchaseSummary /></div>
        <div className={styles.CompFour}><ProductSummary /></div>
        <div className={styles.CompFive}><OrdersVsPurchasesChart /></div>
        <div className={styles.CompSix}><OrderSummary /></div>



      </div>
    </div>
  );
};

export default Dashboard;
