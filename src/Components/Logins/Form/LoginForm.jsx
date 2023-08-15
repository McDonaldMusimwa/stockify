import { useState } from 'react';
import logo from '../../../assets/react.svg';
import styles from './Login.module.css';
import google from '../../../assets/google.svg';
//import { useState } from 'react';
import CreateAccount from './SignForm';

const LoginForm = (props) => {
    let emailIsValid = true;
    let passwordIsValid = true;
    let showModal = false;
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setuserPassword] = useState('');

    const emailHandler = (event) => {
        setUserEmail(event.target.value)

    }

    const passwordHandler = (event) => {
        setuserPassword(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogIn(userEmail, userPassword)
    }

    return (
        <div className={styles.Main}>
            <img src={logo} alt="logo" />
            <h2>Log in to your account</h2>
            <p>Welcome back! Please enter your details.</p>
            <form className={styles.input} onSubmit={submitHandler} >
                <div
                    className={`${styles.control} ${emailIsValid === false ? styles.invalid : ""
                        }`}
                >
                    <label>Email</label>
                    <input
                        placeholder="Enter your email"
                        onChange={emailHandler}
                    ></input>
                </div>
                <div
                    className={`${styles.control} ${passwordIsValid === false ? styles.invalid : ""
                        }`}
                >
                    <label>Password</label>
                    <input type="password"
                        onChange={passwordHandler}
                    ></input>
                </div>
                <a href="333">Forgot Password</a>
                <button className={styles.Button} type="submit">Sign in</button>

            </form>
            <button className={styles.button}><img className={styles.googleicon} src={google} alt='google'></img> Sign in Google</button>
            <p>Dont have an account yet ?<a href="###" > Sign up</a></p>
            {showModal && <CreateAccount />}
        </div>
    )
}

export default LoginForm