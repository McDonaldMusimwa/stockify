// Import necessary modules and components

import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../UI/NavBar/NavBar';


const Root = (props) => {
  return (
    <>
      
      <NavBar onlogout={props.logoutHandler} />
    
      <main>
        <Outlet />
      </main>
    </>
  );
};


Root.propTypes = {
  logoutHandler:PropTypes.func.isRequired,
};


export default Root;
