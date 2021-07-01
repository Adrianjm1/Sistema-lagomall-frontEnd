import React, { Component } from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import loginIcon from '../assets/images/lagomall.jpeg'
// import uiImg from '../../images/login.svg';
import '../assets/css/login.css';

export default class Login extends Component {
    render() {
        return (
            <div>
                <Container className="mt-5">
                    <Row>
                        <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
                            { <img className="icon-img" src={loginIcon} alt="icon" /> }
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

                        <Col lg={8} md={6} sm={12}>
                             {/* <img className="w-100" src={loginIcon} alt="" />  */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
