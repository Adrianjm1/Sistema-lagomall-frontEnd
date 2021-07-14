import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Context
import { Context as UserContext } from '../Hooks/UserContext'


import GetLocales from '../components/locales/GetLocales';
import GetLocalesMaster from '../components/locales/GetLocalesMaster';
import Login from '../components/auth/login';

import PaymentsDetails from '../components/locales/PaymentsDetails';
import LagoMallDataMaster from '../components/lagomallData/LagoMallDataMaster';
import LagoMallData from '../components/lagomallData/LagoMallData';
import RegistrarPago from '../components/pagos/RegistrarPago';
import PaymentsByMonth from '../components/pagos/PaymentsByMonth';


function App() {
    const { state } = React.useContext(UserContext);

    return (
        state.isAdmin ?
            <Switch>
                <Route path="/" exact component={Login} />


                {/* ------------ ADMIN ------------ */}

                <Route path="/admin" exact component={GetLocales} />
                <Route path="/admin/registrar" exact component={RegistrarPago} />
                <Route path="/admin/payments/:code" exact component={PaymentsDetails} />
                <Route path="/admin/month" exact component={PaymentsByMonth} />
            </Switch>
        :
            <Switch>
                <Route path="/" exact component={Login} />


                <Route path="/master" exact component={GetLocalesMaster} />
                <Route path="/master/month" exact component={PaymentsByMonth} />
                <Route path="/master/registrar" exact component={RegistrarPago} />
                <Route path="/master/payments/:code" exact component={PaymentsDetails} />
                {/* ------------ ADMIN ------------ */}

            </Switch>
    );
}

export default App;
