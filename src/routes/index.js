import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

// Context
import { AuthContext } from '../components/auth/AuthContext';

import GetLocales from '../components/locales/GetLocales';
import GetLocalesMaster from '../components/locales/GetLocalesMaster';
import { Login } from '../components/auth/login';

import PaymentsDetails from '../components/pagos/PaymentsDetails';
import LagoMallData from '../components/lagomallData/LagoMallData';
import RegistrarPago from '../components/pagos/RegistrarPago';
import PaymentsByMonth from '../components/pagos/PaymentsByMonth';
import OldTable from '../components/locales/OldTable';
import { AdminRoutes } from './AdminRoutes';
import { PublicRoutes } from './PublicRoutes';


function App() {
    /*     const { state } = React.useContext(UserContext);
     */

    const { user } = useContext(AuthContext);

    return (
        (user.master === true) ?

            <Switch>
                <PublicRoutes path="/" isAuthenticated={user.logged} master={true} exact component={Login} />

                <AdminRoutes path="/master" isAuthenticated={user.logged} exact component={GetLocalesMaster} />
                <AdminRoutes path="/master/month" isAuthenticated={user.logged} exact component={PaymentsByMonth} />
                <AdminRoutes path="/master/registrar" isAuthenticated={user.logged} exact component={RegistrarPago} />
                <AdminRoutes path="/master/payments/:code" isAuthenticated={user.logged} exact component={PaymentsDetails} />
                <AdminRoutes path="/admin/table/:mes" isAuthenticated={user.logged} exact component={OldTable} />

            </Switch>

            :

            <Switch>
                <PublicRoutes path="/" isAuthenticated={user.logged} master={false} exact component={Login} />


                <AdminRoutes path="/admin" isAuthenticated={user.logged} exact component={GetLocales} />
                <AdminRoutes path="/admin/registrar" isAuthenticated={user.logged} exact component={RegistrarPago} />
                <AdminRoutes path="/admin/payments/:code" isAuthenticated={user.logged} exact component={PaymentsDetails} />
                <AdminRoutes path="/admin/month" isAuthenticated={user.logged} exact component={PaymentsByMonth} />
                <AdminRoutes path="/admin/table/:mes" isAuthenticated={user.logged} exact component={OldTable} />

            </Switch>

    );
}

export default App;
