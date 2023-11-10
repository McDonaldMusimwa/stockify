//import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../assets/logo.jpg';
import LoginForm from "./Form/LoginForm";
import styles from './Login.module.css';

const Login = (props) => {
  return (
    <div className={styles.Main}>
      <img className={styles.Logo} src={Logo} alt='logo' />
      <LoginForm onLogIn={props.onLogIn} />
    </div>
  );
};

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired,
  // Add more prop validations if needed
};

export default Login;
