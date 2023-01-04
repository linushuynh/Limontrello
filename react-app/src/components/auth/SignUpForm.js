import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../cssModules/SignupForm.module.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      console.log("error data",data)
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords do not match."])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const redirectLogin = () => {
    history.push("/login")
  }

  return (
    <div className={styles.centeredContainer}>
      <form onSubmit={onSignUp} className={styles.form}>
        <div className={styles.welcomeText}>
          Sign up for your account
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder={"Enter email"}
            required={true}
            className={styles.inputBar}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder={"Enter username"}
            required={true}
            className={styles.inputBar}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
            placeholder={"Enter password"}
            className={styles.inputBar}
          ></input>
        </div>
        <div className={styles.inputContainer}>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            placeholder={"Confirm password"}
            className={styles.inputBar}
            required={true}
          ></input>
        </div>
        <div className={styles.disclaimer}>
          By signing up, you confirm that you've read and accepted our <span>Terms of Service</span> and <span>Privacy Policy.</span>
        </div>
        <div className={styles.inputContainer}>
          <button type='submit' className={styles.loginButton}>Sign up</button>
        </div>
      </form>
      <hr className={styles.hrBar} />
      <div className={styles.signupContainer} onClick={redirectLogin}>
          Already have an account? Log In
      </div>
    </div>
  );
};

export default SignUpForm;
