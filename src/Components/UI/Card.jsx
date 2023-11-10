//import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = (props) => {
  return <div className={`${styles.Card} ${props.className}`}>{props.children}</div>;
};

// Define propTypes to validate the props
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;