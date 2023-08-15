//import React from 'react';
//import Card from '../UI/Card';
import icon from '../../../../assets/react.svg';
import styles from './SalesOverViews.module.css';

const SalesOverViews = () => {
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

  return (
    <div className={styles.Sales}>
      <h2>SalesOverViews</h2>
      <div className={styles.SalesContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.SalesItem}>
            <img src={item.imoji} alt={item.sales} />
            <p>$ {item.figure}</p>
            <p>{item.sales}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesOverViews;
