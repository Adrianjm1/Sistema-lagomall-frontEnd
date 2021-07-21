import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React, { useReducer, useEffect } from 'react';

// Routes
import Router from './routes';

// Components
import Footer from './components/Footer'

// Provider
import UserContext from './Hooks/UserContext';
import {AuthContext} from './components/auth/AuthContext';
import {authReducer} from './components/auth/authReducer'


const init = () => {
  return JSON.parse(localStorage.getItem('user')) || {logged: false};
}

export const App = () => {

  const [ user, dispatch ] = useReducer (authReducer, {}, init)

  useEffect(() => {

    localStorage.setItem('user', JSON.stringify(user));

  }, [user]);

  return (
    <AuthContext.Provider value={{user, dispatch}}>
      <Router />
      <Footer />
    </AuthContext.Provider>
  );
}
