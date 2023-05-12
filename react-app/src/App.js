import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Authentication protection
import { authenticate } from './store/session';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Components
import Dashboard from './components/view/Dashboard'
import BoardView from './components/view/BoardView'
import LoginPage from './components/view/LoginSignupPage/LoginPage/LoginPage';
import SignupPage from './components/view/LoginSignupPage/SignupPage/SignupPage';
import Landing from './components/view/LandingPage/Landing';
import NotFound from './components/view/NotFoundPage/NotFound';


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
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
