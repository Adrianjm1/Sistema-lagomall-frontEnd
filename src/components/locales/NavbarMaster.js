import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import {Navbar,  Container, Button} from "react-bootstrap";
import '../../assets/css/navbar.css'
import { AuthContext } from '../auth/AuthContext';
import { types } from '../../config/constant';


export const NavbarMaster = () => {

    const {user, dispatch} = useContext(AuthContext);
    const history = useHistory();

    const handleLogOut = () => {

        history.replace('/');

        dispatch({
            type: types.logout
        })

    }

        return (
            <>
                <Navbar className="color-nav"  variant="dark">
                    <Container>
                        <Navbar.Brand href="/master">
                            <b className="nav">Control de cobranzas Lago Mall. </b>
                            Bienvenido, {user.name}
                        </Navbar.Brand>
                    </Container>

                        <Navbar.Brand href="/master">
                            <b>Inicio</b>
                        </Navbar.Brand>

                        <Navbar.Brand href="/master/registrar">
                            <b>Registrar pago</b>
                        </Navbar.Brand>

                        <Navbar.Brand href="/master/month">
                            <b>Buscar pagos</b>
                        </Navbar.Brand>

                        <Button onClick={handleLogOut}>
                            <b>Salir</b>
                        </Button>

                </Navbar>
            </>
        )
    }
