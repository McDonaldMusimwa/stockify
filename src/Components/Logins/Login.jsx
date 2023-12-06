//import React from 'react';
import PropTypes from 'prop-types';
//import Logo from '../../assets/logo.png';
import LoginForm from "./Form/LoginForm";
import styles from './Login.module.scss';

const Login = (props) => {
  
  return (
    <div className={styles.Main}>
     
      <LoginForm onLogIn={props.onLogIn} />
    </div>
  );
};

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired,
  // Add more prop validations if needed
};

export default Login;
