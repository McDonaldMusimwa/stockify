import styles from './ChartComponent.module.css';
import PropTypes from 'prop-types';

export const ChartComponent = (props) => {
    // Your component code here

    return (
        <div className={styles.Container}>
            <div className={styles.SalesItem}>
                <img src={props.icon} alt={props.alt} />
                <div className={styles.Font}>
                    <p>{props.figure}</p>
                    <p>{props.category}</p>
                </div>
            </div>
        </div>
    );
};

ChartComponent.propTypes = {
  icon: PropTypes.string.isRequired,
  figure: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
