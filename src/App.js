
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import GetLocales from './components/GetLocales';
import Login from './components/Login';
import NavbarLogin from './components/NavbarLogin';
import NavbarLoged from './components/NavbarLoged';
import Footer from './components/Footer'
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import getPayments from './components/getPayments';
import PaymentsDetails from './components/PaymentsDetails';
import LagoMallDataMaster from './components/LagoMallDataMaster';
import LagoMallData from './components/LagoMallData';
import RegistrarPago from './components/RegistrarPago';


function App() {
  return (
    <Router>
      <Route path="/login" exact component={NavbarLogin} />
      <Route path="/login" exact component={Login} />


      <Route path="/register" exact component={RegistrarPago} />


      <Route path="/master" component={NavbarLoged} />
      <Route path="/master" component={LagoMallDataMaster} />
      <Route path="/master" component={GetLocales} />

      {/* <Route path="/home" component={NavbarLoged} /> */}


      <Route path="/home" component={NavbarLoged} />
      <Route path="/home" component={LagoMallData} />
      <Route path="/home" component={GetLocales} />

      <Route path="/registrar" component={NavbarLoged} />
      <Route path ="/registrar" component = {RegistrarPago}/>

      <Route path="/payments" component={NavbarLoged} />

      <Route path="/payments/:code" component={PaymentsDetails} />





 


      <Footer/>

    </Router>
  );
} 

export default App;
