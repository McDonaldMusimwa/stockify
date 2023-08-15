import {useState} from 'react'
import logo from '../../../assets/react.svg';
import styles from './SignUp.module.css';
import google from '../../../assets/google.svg';
//import { useState } from 'react';

const SignForm = () => {
    const [enteredUserName,setenteredUserName] = useState('');
    const [enteredUserEmail,setenteredUserEmail] = useState('');
    const [enteredUserPassword,setenteredUserPassword] = useState('');


    const enteredUserNameHandler = (event)=>{
        if(event.target.value.trim().length()===0)
        setenteredUserName(event.target.value)

    }
    const enteredUserEmailHandler = (event)=>{
        if(event.target.value.trim().includes('@'))
        setenteredUserEmail(event.target.value)
    }

    const enteredUserPasswordHandler = (event)=>{
        if(event.target.value.trim().length()>8)
        setenteredUserPassword(event.target.value)
    }

    const onSubmitHandler =(event)=>{
        event.preventDefault();
        const formData={
            name:enteredUserName,
            email:enteredUserEmail,
            password:enteredUserPassword
        }
        console.log(formData);
    }

    return (
        <div className={styles.Main}>
            <img src={logo} alt="logo" />
            <h2>Create an account</h2>
            <p>Welcome back! Please enter your details.</p>
            <form className={styles.input} onSubmit={onSubmitHandler}>
                <label>Name</label>
                <input type='text' placeholder='Enter your Name' value={enteredUserName} onChange={enteredUserNameHandler}></input>
                <label>Email</label>
                <input placeholder="Enter your email" type="email" value={enteredUserEmail} onChange={enteredUserEmailHandler}></input>
                <label>Password</label>
                <input type="password" onChange={enteredUserPasswordHandler}></input>
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