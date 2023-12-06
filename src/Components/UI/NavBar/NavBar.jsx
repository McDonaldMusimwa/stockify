import styles from './NavBar.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import React from 'react'
import Logo from '../../../assets/logo.png';
import { faHouse, faFile, faGear, faUser, faRightFromBracket, faCartShopping, faStore, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import SearchBar from '../../Pages/DashBoard/SearchBar/SearchBar';

const NavBar = (props) => {

    return (
        <>
            <SearchBar />
            <div className={styles.NavMain}>
                <div className={styles.NameLogo}><Link to={'/'}><img src={Logo} alt='logo'></img><strong>Stockify</strong></Link></div>
                <nav className={styles.NavTop}>
                    <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="/"><FontAwesomeIcon icon={faHouse} className={styles.icon} />DashBoad</NavLink>
                    <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="inventory"><FontAwesomeIcon icon={faCartShopping} className={styles.icon} />Inventory</NavLink>
                    <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="reports"><FontAwesomeIcon icon={faFile} className={styles.icon} />Reports</NavLink>
                    <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="suppliers"><FontAwesomeIcon icon={faUser} className={styles.icon} />Suppliers</NavLink>
                    <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="orders"><FontAwesomeIcon icon={faBox} className={styles.icon} />Orders</NavLink>
                    <NavLink className={({ isActive }) => isActive ? styles.active : undefined} to="shipments"><FontAwesomeIcon icon={faStore} className={styles.icon} />Shipments</NavLink>

                </nav>
                <div className={styles.NavBottom}>
                    <NavLink to="settings"><FontAwesomeIcon icon={faGear} className={styles.icon} />Settings</NavLink>
                    <span onClick={props.logout}><FontAwesomeIcon icon={faRightFromBracket} className={styles.icon} />Log out</span>
                </div>
            </div>
        </>
    )
}

export default NavBar
NavBar.propTypes = {
    logout: PropTypes.func.isRequired, // Function prop is required
};