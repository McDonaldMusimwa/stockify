//import React from 'react'
import Logo from '../../assets/logo.jpg'
import LoginForm from "./Form/LoginForm"
import styles from './Login.module.css'

const Login = () => {
  return (
    <div className={styles.Main}>
        <img className={styles.Logo} src={Logo} alt='logo' />
        <LoginForm />
       

    </div>
  )
}

export default Login