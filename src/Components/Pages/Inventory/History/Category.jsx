//import React from 'react';
import PropTypes from 'prop-types';
import styles from './Category.module.css';

const Category = (props) => {
    
  return (
    <div className={styles.Category}>
      Category
      <p className={styles.span2}>{props.length}</p>
    </div>
  );
};

Category.propTypes = {
  length: PropTypes.number.isRequired,
};

export default Category;
