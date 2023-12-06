import {useState} from 'react';
import {Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import styles from './SignUp.module.scss';

//import { useState } from 'react';

const SignForm = () => {
    const [enteredFirstName,setenteredFirstName] = useState('');
    const [enteredLastName,setenteredLastName] = useState('');
    const [enteredUserEmail,setenteredUserEmail] = useState('');
    const [enteredUserPassword,setenteredUserPassword] = useState('');
    const [enteredUserPasswordConfirm,setenteredUserPasswordConfirm] = useState('');

    const enteredUserFirstNameHandler = (event)=>{
        if(event.target.value.trim().length()===0)
        setenteredFirstName(event.target.value)

    }
    const enteredUserLastNameHandler = (event)=>{
        if(event.target.value.trim().length()===0)
        setenteredLastName(event.target.value)

    }
    const enteredUserEmailHandler = (event)=>{
        if(event.target.value.trim().includes('@'))
        setenteredUserEmail(event.target.value)
    }

    const enteredUserPasswordHandler = (event)=>{
        if(event.target.value.trim().length()>8)
        setenteredUserPassword(event.target.value)
    }
    const enteredUserPassword2Handler = (event)=>{
        if(event.target.value.trim().length()>8)
        setenteredUserPasswordConfirm(event.target.value)
    }

    const onSubmitHandler =(event)=>{
        event.preventDefault();
       
        if(enteredUserPassword===enteredUserPasswordConfirm){
            const formData={
                firstname:enteredFirstName,
                lastname:enteredLastName,
                email:enteredUserEmail,
                password:enteredUserPassword
            }
            console.log(formData);
        }
  
       
    }

    return (
        <div className={styles.Main}>
            <img src={logo} alt="logo" />
            <h2>Create an account</h2>
            <p>Welcome to Hero </p>
            <form className={styles.input} onSubmit={onSubmitHandler}>
                <label>First Name</label>
                <input type='text' name='firstname' placeholder='Enter your Name' value={enteredFirstName} onChange={enteredUserFirstNameHandler}></input>
                <label>Last Name</label>
                <input type='text' name='lastname' placeholder='Enter your Name' value={enteredLastName} onChange={enteredUserLastNameHandler}></input>
                <label>Email</label>
                <input placeholder="Enter your email" type="email" value={enteredUserEmail} onChange={enteredUserEmailHandler}></input>
                <label>Password</label>
                <input type="password" name='password' onChange={enteredUserPasswordHandler}></input>
                <label>Confirm Password</label>
                <input type="password"  onChange={enteredUserPassword2Handler}></input>
                <p>Must be at least 8 characters.</p>
                
                <button className={styles.Button} type="submit">Sign up</button>
                

            </form>
            
            <p>Already have an account yet ?<Link to="login">Log In</Link></p>

        </div>
    )
}

export default SignForm