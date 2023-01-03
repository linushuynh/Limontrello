import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
// import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import Dashboard from './components/view/Dashboard'
import BoardView from './components/view/BoardView'
import { authenticate } from './store/session';
import LoginPage from './components/view/LoginPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <h1>Landing Page(in landing page, check if logged in/current user exists and if so then redirect to /dashboard)</h1>
        </Route>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/dashboard' exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/b/:boardId' exact={true}>
          <BoardView />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
