//import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchBar.module.css';
import dummyImage from '../../../../assets/logo.png';

const SearchBar = () => {
    return (
        <div className={styles.SearchBar}>
            <input type='search' placeholder='Search product,supplier,order' />
            <div className={styles.Profile}>
                <FontAwesomeIcon icon={faBell} />
                <img src={dummyImage} alt="user image" />
            </div>

        </div>
    )
}

export default SearchBar