import { useState,useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import styles from './Login.module.scss';
import PropTypes from 'prop-types';


//import { useState } from 'react';
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
}

const LoginForm = (props) => {


  
  let emailIsValid = true;
  let passwordIsValid = true;
  const navigation = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.value.includes("@")
    );
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = {
      email:emailState.value,
      password:passwordState.value
    }
    
    props.onLogIn(formData,)
        
  }
  /*
  const openSignUp=()=>{
    navigate('/sign-up')
  }*/


  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const isSubmitting = navigation.state === 'submitting';
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
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          ></input>
        </div>
        <div
          className={`${styles.control} ${passwordIsValid === false ? styles.invalid : ""
            }`}
        >
          <label>Password</label>
          <input type="password"
            placeholder='Enter your password'
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          ></input>
        </div>
        
        
        <button className={styles.Button} type="submit"  disabled={!formIsValid}>{isSubmitting ? 'Submitting...' : 'Sign in'}</button>


      </form>

      <p>Contact admin for new account</p>

    </div>
  )
}

LoginForm.propTypes = {
  onLogIn: PropTypes.func.isRequired,

};

export default LoginForm