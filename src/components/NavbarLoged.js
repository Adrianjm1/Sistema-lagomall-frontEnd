import React, { Component } from 'react'
import {Navbar,  Container } from "react-bootstrap";
import '../assets/css/navbar.css'


export default class NavbarLoged extends Component {
    render() {
        return (
            <>
                <Navbar className="color-nav"  variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            <b className="nav">Control de cobranzas Lago Mall. </b>
                            Bienvenido, *user*
                        </Navbar.Brand>
                    </Container>


                        <Navbar.Brand href="#home">
                            <b>Realizar pago</b>
                        </Navbar.Brand>
                        <Navbar.Brand href="#home">
                            <b>Facturas</b>
                        </Navbar.Brand>
                </Navbar>
            </>
        )
    }
}
