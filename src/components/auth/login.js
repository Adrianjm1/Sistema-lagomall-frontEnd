import React from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap";

// Components
import Navbar from './navbar.js';

// Style
import '../../assets/css/login.css';

// Images
import loginIcon from '../../assets/images/lagomall.jpeg'
import lagoMall from '../../assets/images/lagomallcc.jpg'

function Login(props){
    return (
        <>
            <Navbar />
            <Container className="mt-5" >
                <Row>
                    <Col xs={5} className="text-center mt-5">
                        <img className="icon-img" src={loginIcon} alt="icon" />
                        
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary btn-block" type="submit">Login</Button>

                        </Form>
                    </Col>

                    <Col xs={4} className="lgContainer">
                        <img className="lagomall" src={lagoMall} alt="" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;