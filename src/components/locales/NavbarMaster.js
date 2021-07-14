import React, { Component } from 'react'
import {Navbar,  Container} from "react-bootstrap";
import '../../assets/css/navbar.css'


export default class NavbarLoged extends Component {
    render() {


        return (
            <>
                <Navbar className="color-nav"  variant="dark">
                    <Container>
                        <Navbar.Brand href="/master">
                            <b className="nav">Control de cobranzas Lago Mall. </b>
                            Bienvenido, *user*
                        </Navbar.Brand>
                    </Container>


                        <Navbar.Brand href="/master/registrar">
                            <b>Registrar pago</b>
                        </Navbar.Brand>

                        <Navbar.Brand href="/master/month">
                            <b>Pagos del mes</b>
                        </Navbar.Brand>

                        <Navbar.Brand href="/master">
                            <b>Facturas</b>
                        </Navbar.Brand>
                </Navbar>
            </>
        )
    }
}
