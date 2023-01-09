import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import styles from '../cssModules/LoginForm.module.css'
import loadingCircle from "../../assets/yellowloadingcircle.svg"

const LoginForm = ({ loaded, setLoaded }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    setLoaded(false)
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      setLoaded(true);
    } else {
      // await dispatch(getUserThunk())
      setLoaded(true);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const redirectSignup = (e) => {
    history.push("/signup")
  }

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  const loginDemo = async () => {
    setLoaded(false)
    const data = await dispatch(login('demo@aa.io', 'password'))
    if (data) {
      setErrors(data);
      setLoaded(true);
    }
  }

  return (
    <div className={styles.centeredContainer}>
      <form onSubmit={onLogin} className={styles.form} >
        <div className={styles.welcomeText}>
          Log in to Limontrello
        </div>

        <div className={styles.inputContainer}>
          <input
            name='email'
            type='email'
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
        <div className={styles.errors}>
          {errors.map((error, ind) => (
            <div key={ind} className="errors">{error}</div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <button type='submit' className={styles.loginButton}>Continue</button>
        </div>
        <div className={loaded? styles.hidden : styles.circleContainer}>
          <img alt='loadingCircle' src={loadingCircle} className={styles.loadingCircle} />
        </div>
      </form>
      <hr className={styles.hrBar} />
      <div className={styles.footerTextContainer}>
        <div className={styles.hoverable} onClick={loginDemo}>
          Need a demo account?
        </div>
        <span id={styles.dot} >•</span>
        <div className={styles.hoverable} onClick={redirectSignup}>
            Sign up for an account
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
