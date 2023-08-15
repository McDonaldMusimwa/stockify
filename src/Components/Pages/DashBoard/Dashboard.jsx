//import React from 'react';
import NavBar from '../../UI/NavBar/NavBar';
import styles from './Dashboard.module.css';
import SearchBar from './SearchBar/SearchBar';
import Charts from './Charts/Chart';

const Dashboard = () => {
  return (
    <div className={styles.DashboardMain}>

      <SearchBar />


      <NavBar />

      <div className={styles.Dashboard}>
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
