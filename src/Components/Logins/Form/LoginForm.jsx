import logo from '../../../assets/react.svg';
import styles from './Login.module.css';
import google from '../../../assets/google.svg';

const LoginForm = () => {
    return (
        <div className={styles.Main}>
            <img src={logo} alt="logo" />
            <h2>Log in to your account</h2>
            <p>Welcome back! Please enter your details.</p>
            <form className={styles.input}>
                <label>Email</label>
                <input placeholder="Enter your email" type="email" ></input>
                <label>Password</label>
                <input type="password" ></input>
                <a href="333">Forgot Password</a>
                <button className={styles.Button} type="submit">Sign in</button>
                <button className={styles.button}><img className={styles.googleicon} src={google} alt='google'></img> Sign in Google</button>
            </form>
            
            <p>Dont have an account yet ?<a href="###"> Sign up</a></p>
        </div>
    )
}

export default LoginForm