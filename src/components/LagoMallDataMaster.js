import React, { Component } from 'react';
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/form.css';


export default class LagoMallDataMaster extends Component {

    state = {
        breakeven: true,
        discount: true,
        clase: 'discount'
    }

    onClickBreakeven = (e) => {

        this.setState({breakeven: false});

    }

    onClickDiscount = (e) => {

        this.setState({discount: false, clase: ''});
    
    }


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
                            <Form.Control type="text" value="2" disabled={this.state.breakeven} />
                        </Col>
                        <Col>
                            <FontAwesomeIcon color="#013E7C" onClick={this.onClickBreakeven} className="edit" icon={faEdit} size="lg" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formCondominio">
                        <Form.Label column sm={4}>
                            <b>Cuota total del condominio</b>
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" value="2" name="condominio" disabled/>
                        </Col>
                        <Col sm={1}>
                            <Form.Control type="text" className={this.state.clase} value="80" disabled={this.state.discount} />
                        </Col>     
                        <Col>
                            <FontAwesomeIcon onClick={this.onClickDiscount} color="#013E7C" className="edit" icon={faEdit} size="lg" />
                        </Col>                  
                    </Form.Group>

                    <br />

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Generar</Button>
                        </Col>
                    </Form.Group>
                </Form>

                <hr />
            </Container>

        )
    }
}
