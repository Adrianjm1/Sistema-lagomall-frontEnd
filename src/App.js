
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import GetLocales from './components/GetLocales';
import GetLocalesMaster from './components/GetLocalesMaster';
import Login from './components/Login';
import NavbarLogin from './components/NavbarLogin';
import NavbarLoged from './components/NavbarLoged';
import NavbarMaster from './components/NavbarMaster';
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PaymentsDetails from './components/PaymentsDetails';
import LagoMallDataMaster from './components/LagoMallDataMaster';
import LagoMallData from './components/LagoMallData';
import RegistrarPago from './components/RegistrarPago';
<<<<<<< HEAD
import { UserContext } from './Hooks/UserContext';



=======
import PaymentsByMonth from './components/PaymentsByMonth';
>>>>>>> b0ed5dec1fda4549707f02940f2d6894bf27f052


function App() {
  return (




      <Router>
        <Route path="/" exact component={NavbarLogin} />
        <Route path="/" exact component={Login} />

        {/* ------------ ADMIN ------------ */}

        <Route path="/admin" exact component={NavbarLoged} />
        <Route path="/admin" exact component={LagoMallData} />
        <Route path="/admin" exact component={GetLocales} />

        <Route path="/admin/registrar" exact component={NavbarLoged} />

        <Route path="/admin/registrar" exact component={RegistrarPago} />

        <Route path="/admin/payments" exact component={NavbarLoged} />
        <Route path="/admin/payments/:code" exact component={NavbarLoged} />
        <Route path="/admin/payments/:code" exact component={PaymentsDetails} />

<<<<<<< HEAD
        {/* ------------ MASTER ------------ */}
=======
      <Route path="/master/month" exact component={NavbarMaster} />
      <Route path="/master/month" exact component={PaymentsByMonth} />

>>>>>>> b0ed5dec1fda4549707f02940f2d6894bf27f052

        <Route path="/master" exact component={NavbarMaster} />
        <Route path="/master" exact component={LagoMallDataMaster} />
        <Route path="/master" exact component={GetLocalesMaster} />

        <Route path="/master/registrar" exact component={NavbarMaster} />

        <Route path="/master/registrar" exact component={RegistrarPago} />

        <Route path="/master/payments" exact component={NavbarMaster} />
        <Route path="/master/payments/:code" exact component={NavbarMaster} />
        <Route path="/master/payments/:code" exact component={PaymentsDetails} />

        <Footer />

      </Router>

  );
}

export default App;
