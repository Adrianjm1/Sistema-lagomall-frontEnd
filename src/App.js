
import './App.css';
import React from 'react';
import GetLocales from './components/GetLocales';
import Login from './components/Login'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Login/>

      <Route path="/login" component={Login} />
      <Route path="/locales" component={GetLocales} />
    </Router>
  );
} 

export default App;
