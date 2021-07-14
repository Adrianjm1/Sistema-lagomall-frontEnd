import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Context
import { Context as UserContext } from '../Hooks/UserContext'


import GetLocales from '../components/GetLocales';
import GetLocalesMaster from '../components/GetLocalesMaster';
import Login from '../components/auth/login';

import PaymentsDetails from '../components/PaymentsDetails';
import LagoMallDataMaster from '../components/LagoMallDataMaster';
import LagoMallData from '../components/LagoMallData';
import RegistrarPago from '../components/RegistrarPago';
import PaymentsByMonth from '../components/PaymentsByMonth';

//import NavbarLoged from '../components/NavbarLoged';
//import NavbarMaster from '../components/NavbarMaster';

function App() {
    const { state } = React.useContext(UserContext);

    return (
        state.isAdmin ?
            <Switch>
                <Route path="/" exact component={Login} />

                {/*<Route path="/admin" exact component={NavbarLoged} />*/}
                {/*<Route path="/admin/registrar" exact component={NavbarLoged} />*/}
                {/*<Route path="/admin/payments" exact component={NavbarLoged} />*/}
                {/*<Route path="/admin/payments/:code" exact component={NavbarLoged} />*/}


                {/* ------------ ADMIN ------------ */}
                <Route path="/admin" exact component={LagoMallData} />
                <Route path="/admin" exact component={GetLocales} />
                <Route path="/admin/registrar" exact component={RegistrarPago} />
                <Route path="/admin/payments/:code" exact component={PaymentsDetails} />
            </Switch>
        :
            <Switch>
                <Route path="/" exact component={Login} />

                {/* ------------ ADMIN ------------ */}

                {/*<Route path="/master/month" exact component={NavbarMaster} /> */}
                {/*<Route path="/master" exact component={NavbarMaster} /> */}
                {/*<Route path="/master/registrar" exact component={NavbarMaster} /> */}
                {/*<Route path="/master/payments" exact component={NavbarMaster} /> */}
                {/*<Route path="/master/payments/:code" exact component={NavbarMaster} /> */}

                <Route path="/master/month" exact component={PaymentsByMonth} />
                <Route path="/master" exact component={LagoMallDataMaster} />
                <Route path="/master" exact component={GetLocalesMaster} />
                <Route path="/master/registrar" exact component={RegistrarPago} />
                <Route path="/master/payments/:code" exact component={PaymentsDetails} />
            </Switch>
    );
}

export default App;
