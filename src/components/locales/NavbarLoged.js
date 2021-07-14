import React, { Component } from 'react'
import {Navbar,  Container, Button } from "react-bootstrap";
import RegistrarPago from '../pagos/RegistrarPago';
import '../../assets/css/navbar.css'



export default class NavbarLoged extends Component {
    render() {


        return (
            <>
                <Navbar className="color-nav"  variant="dark">
                    <Container>
                        <Navbar.Brand href="/admin">
                            <b className="nav">Control de cobranzas Lago Mall. </b>
                            Bienvenido, *user*
                        </Navbar.Brand>
                    </Container>


                        <Navbar.Brand href="/admin/registrar">
                            <b>Registrar pago</b>
                        </Navbar.Brand>

                        <Navbar.Brand href="/admin/month">
                            <b>Pagos del mes</b>
                        </Navbar.Brand>

                        <Navbar.Brand href="/admin">
                            <b>Facturas</b>
                        </Navbar.Brand>
                </Navbar>
            </>
        )
    }
}
