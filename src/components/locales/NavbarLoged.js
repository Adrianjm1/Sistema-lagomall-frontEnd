import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import {Navbar,  Container, Button} from "react-bootstrap";
import '../../assets/css/navbar.css'

import { AuthContext } from '../auth/AuthContext';
import { types } from '../../config/constant';


export const NavbarLoged = () => {

    const {user, dispatch} = useContext(AuthContext);
    const history = useHistory();

    const handleLogOut = () => {

        dispatch({
            type: types.logout
        })

        history.replace('/');

    }

        return (
            <>
                <Navbar className="color-nav"  variant="dark">
                    <Container>
                        <Navbar.Brand href="/admin">
                            <b className="nav">Control de cobranzas Lago Mall. </b>
                            Bienvenido, {user.name}
                        </Navbar.Brand>
                    </Container>

                        <Navbar.Brand href="/admin">
                            <b>Inicio</b>
                        </Navbar.Brand>

                        <Navbar.Brand href="/admin/registrar">
                            <b>Registrar pago</b>
                        </Navbar.Brand>

                        <Navbar.Brand href="/admin/month">
                            <b>Pagos y deudas</b>
                        </Navbar.Brand>

                        <Button onClick={handleLogOut}>
                            <b>Salir</b>
                        </Button>

                </Navbar>
            </>
        )
    }
