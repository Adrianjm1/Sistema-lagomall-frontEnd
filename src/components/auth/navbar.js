import React, { Component } from 'react'
import {Navbar,  Container } from "react-bootstrap";
import '../../assets/css/navbar.css'


export default class NavbarLogin extends Component {

    render() {
        return (
            <>
                <Navbar className="color-nav"  variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            <b className="nav">Control de cobranzas Lago Mall</b>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </>
        )
    }
}
