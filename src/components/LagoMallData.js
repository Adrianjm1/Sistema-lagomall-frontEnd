import React, { Component } from 'react';
import { Form, Col, Row, Container } from "react-bootstrap";
import '../assets/css/form.css';


export default class LagoMallData extends Component {

    render() {
        return (

            <Container className="form">

                <Form className="mt-5">

                    <Form.Group as={Row} controlId="formMetrajeCC">
                        <Form.Label column sm={4}>
                            <b>Metraje del Centro Comercial</b>
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control value="18.030" disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBreakeven">
                        <Form.Label column sm={4}>
                            <b>Punto de Equilibrio</b>
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" value="2" disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="condomi" controlId="formCondominio">
                        <Form.Label column sm={4}>
                            <b>Cuota total del condominio</b>
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" className="ctotalc" value="2" name="condominio" disabled/>
                        </Col>
                        <Col sm={1}>
                            <Form.Control className="discount" type="text" value="80" disabled />
                        </Col>                      
                    </Form.Group>

                    <br />

                </Form>

                <hr />
            </Container>

        )
    }
}
