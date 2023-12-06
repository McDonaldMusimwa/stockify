//import React from 'react';
import PropTypes from 'prop-types';
import styles from './TotalProducts.module.css';

const TotalProducts = (props) => {
  
  return (
    <div className={styles.TotalProducts}>
      TotalProducts
      <div className={styles.Figures}>
        <span className={styles.span2}>{props.totalCount}</span>
        <span className={styles.span2}>$ {props.TotalCost}</span>
        <span className={styles.span}>last 7 days</span>
        <span className={styles.span}>Cost</span>
      </div>
    </div>
  );
};

TotalProducts.propTypes = {
  TotalCost: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default TotalProducts;
