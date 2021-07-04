
import './App.css';
import React from 'react';
import GetLocales from './components/GetLocales';
import Login from './components/Login';
import NavbarLogin from './components/NavbarLogin';
import NavbarLoged from './components/NavbarLoged';
import Footer from './components/Footer'
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
// import getPayments from './components/getPayments';
import PaymentsDetails from './components/PaymentsDetails';

function App() {
  return (
    <Router>
      <Route path="/login" exact component={NavbarLogin} />
      <Route path="/login" exact component={Login} />


      <Route path="/locales" component={NavbarLoged} />
      <Route path="/locales" component={GetLocales} />


      <Route path="/payments" component={NavbarLoged} />
      <br/>
      <br/>
      <Route path="/payments/:code" component={PaymentsDetails} />



 


      <Footer/>

    </Router>
  );
} 

export default App;
