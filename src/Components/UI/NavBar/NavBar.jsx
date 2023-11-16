import styles from './NavBar.module.css';
import PropTypes from 'prop-types';
//import React from 'react'
import Logo from '../../../assets/logo.jpg';
import { faHouse, faFile, faGear, faUser, faRightFromBracket, faCartShopping, faStore, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import SearchBar from '../../Pages/DashBoard/SearchBar/SearchBar';

const NavBar = (props) => {
    
    return (
        <>
        <SearchBar />
        <div className={styles.NavMain}>
            <a href='##'><img src={Logo} alt='logo'></img>Stockify</a>
            <nav className={styles.NavTop}>
                <NavLink to="/"><FontAwesomeIcon icon={faHouse} className={styles.icon}/>DashBoad</NavLink>
                <NavLink to="inventory"><FontAwesomeIcon icon={faCartShopping} className={styles.icon}/>Inventory</NavLink>
                <NavLink to="reports"><FontAwesomeIcon icon={faFile} className={styles.icon}/>Reports</NavLink>
                <NavLink to="suppliers"><FontAwesomeIcon icon={faUser} className={styles.icon}/>Suppliers</NavLink>
                <NavLink to="orders"><FontAwesomeIcon icon={faBox} className={styles.icon}/>Orders</NavLink>
                <NavLink to="shipments"><FontAwesomeIcon icon={faStore} className={styles.icon}/>Shipments</NavLink>
                
            </nav>
            <div className={styles.NavBottom}>
                <NavLink to="settings"><FontAwesomeIcon icon={faGear} className={styles.icon}/>Settings</NavLink>
                <span onClick={props.logout}><FontAwesomeIcon icon={faRightFromBracket} className={styles.icon}/>Log out</span>
            </div>
        </div>
        </>
    )
}

export default NavBar
NavBar.propTypes = {
    logout: PropTypes.func.isRequired, // Function prop is required
  };