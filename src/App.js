
import './App.css';
import React from 'react';
import GetLocales from './components/GetLocales';
import Login from './components/Login';
import NavbarLogin from './components/NavbarLogin'
import Footer from './components/Footer'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import getPayments from './components/getPayments';

function App() {
  return (
    <Router>
      <NavbarLogin/>


      <Route path="/login" exact component={Login} />
      <Route path="/locales" component={GetLocales} />
      <Route path="/payments" component={getPayments} />


      <Footer/>

    </Router>
  );
} 

export default App;
