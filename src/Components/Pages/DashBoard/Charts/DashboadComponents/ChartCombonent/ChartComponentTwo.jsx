//import React from 'react'
import styles from './ChartComponent.module.css';
import PropTypes from 'prop-types';


export const ChartComponentTwo = (props) => {
    return (
        <div>
            <div className={styles.SalesItem2}>
                <img src={props.icon} alt={props.alt} />
                <div className={styles.Font}>
                    <p>{props.figure}</p>
                    <p>{props.category}</p>
                </div>
            </div>
        </div>
    );
}

ChartComponentTwo.propTypes = {
    icon: PropTypes.string.isRequired,
    figure: PropTypes.number.isRequired,
    alt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  };
  