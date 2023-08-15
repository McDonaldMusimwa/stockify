import Logo from '../../assets/logo.jpg';
import SignUpForm from "./Form/SignForm";
import styles from './Login.module.css';

const SignUp = () => {
  return (
    <div className={styles.Main}>
        <img className={styles.Logo} src={Logo} alt='logo' />
        <SignUpForm />
       

    </div>
  )
}

export default SignUp