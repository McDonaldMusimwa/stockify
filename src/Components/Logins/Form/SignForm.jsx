//import React from 'react'
import logo from '../../../assets/react.svg';
import styles from './SignUp.module.css';
import google from '../../../assets/google.svg';
const SignForm = () => {
    return (
        <div className={styles.Main}>
            <img src={logo} alt="logo" />
            <h2>Create an account</h2>
            <p>Welcome back! Please enter your details.</p>
            <form className={styles.input}>
                <label>Name</label>
                <input type='text' placeholder='Enter your Name'></input>
                <label>Email</label>
                <input placeholder="Enter your email" type="email" ></input>
                <label>Password</label>
                <input type="password" ></input>
                <p>Must be at least 8 characters.</p>
                <a href="333">Forgot Password</a>
                <button className={styles.Button} type="submit">Sign up</button>
                <button className={styles.button}><img className={styles.googleicon} src={google} alt='google' /> Sign up with Google</button>

            </form>
            
            <p>Already have an account yet ?<a href="###">Log In</a></p>

        </div>
    )
}

export default SignForm