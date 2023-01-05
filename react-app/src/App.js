import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/view/Dashboard'
import BoardView from './components/view/BoardView'
import { authenticate } from './store/session';
import LoginPage from './components/view/LoginPage';
import SignupPage from './components/view/SignupPage';
import Landing from './components/view/Landing';

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
          <Landing />
        </Route>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/signup' exact={true}>
          <SignupPage />
        </Route>
        <ProtectedRoute path='/dashboard' exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/b/:boardId' exact={true}>
          <BoardView />
        </ProtectedRoute>
        <Route>
          <h1>This is 404, render 404 component here</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
