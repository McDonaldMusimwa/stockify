//import React from 'react'
import Logo from '../../assets/logo.jpg';
import LoginForm from "./Form/LoginForm"
import styles from './Login.module.css'

const Login = (props) => {
console.log(props.onLogIn)
  return (
    <div className={styles.Main}>
        <img className={styles.Logo} src={Logo} alt='logo' />
        <LoginForm onLogIn={props.onLogIn}/>
       

    </div>
  )
}

export default Login