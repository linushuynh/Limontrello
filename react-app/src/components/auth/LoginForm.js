import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import styles from '../cssModules/LoginForm.module.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={styles.centeredContainer}>
      <form onSubmit={onLogin} className={styles.form} >
        <div className={styles.welcomeText}>
          Log in to Limontrello
        </div>
        <div className={styles.errors}>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            name='email'
            type='text'
            placeholder='Enter Email'
            value={email}
            onChange={updateEmail}
            className={styles.inputBar}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            name='password'
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={updatePassword}
            className={styles.inputBar}
            required
          />
        </div>
          <div className={styles.inputContainer}>
            <button type='submit' className={styles.loginButton}>Log In</button>
          </div>
      </form>
      <hr className={styles.hrBar} />
      <div className={styles.signupContainer}>
          Sign up for an account
      </div>
    </div>
  );
};

export default LoginForm;
