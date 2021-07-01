import React, { Component } from 'react'
import {Navbar,  Container,  Row} from "react-bootstrap";
import '../assets/css/navbarLogin.css'


export default class NavbarLogin extends Component {
    render() {
        return (
            <>
                <Navbar className="color-nav"  variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">

                            Control de cobranzas Lago Mall
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </>
        )
    }
}
