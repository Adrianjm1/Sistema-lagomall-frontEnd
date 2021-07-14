import { text } from '@fortawesome/fontawesome-svg-core';
import React, { Component } from 'react'
import { Form, Col, Row, Button } from "react-bootstrap";
import axios, { generateToken } from '../config/axios';
import payment from '../assets/images/payment.jpg';
import card from '../assets/images/card-1.jpg';

import '../assets/css/registrar.css';



export default class RegistrarPago extends Component {

    state = {
        datos: [],
        code: '',
        amount: 0,
        reference: '',
        bank: '',
        pay: false,
        exchange: 0

    }

    onInputChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })

    }

    onCheck = e => {

        if (e.target.checked) {
            this.setState({ pay: true })

        } else {

            this.setState({ pay: false })
        }



    }


    onSubmit = async e => {

        try {

            e.preventDefault();
            generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo1LCJ1c2VybmFtZSI6InZpcmdpbmlhZ3NyIiwicGFzc3dvcmQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiJ9LCJpYXQiOjE2MjYyMTc3MjYsImV4cCI6MTYyNjIzNTcyNn0.uUOAO5Y8qCSLS_C2hk82Z9ysFCejzwqaLGpTBQYIC0M')  // for all requests

            const res = await axios.post('/payments/make',
                {
                    code: this.state.code,
                    bank: this.state.bank,
                    amountUSD: this.state.amount,
                    referenceNumber: this.state.reference,
                    exchangeRate: this.state.exchange,
                    paymentUSD: this.state.pay
                })

            console.log(res.data);

            this.setState({code: '', bank: '', amount: '', reference: '', exchange: '', pay: ''});

        }
        catch (error) {

            console.log(error);
        }


    }


    render() {
        return (
            <div className="m-0 justify-content-center">

                <Row>

                    <Col xs={6}>

                        <Form onSubmit={this.onSubmit} className="col-auto formulario">

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <h1 className="title"><b>Realizar pago</b></h1>
                                <br />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Codigo de local</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar codigo" name="code" onChange={this.onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Monto en dolares</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar monto" name="amount" onChange={this.onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Numero de referencia</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar referencia" name="reference" onChange={this.onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Banco</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar banco" name="bank" onChange={this.onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Tasa de cambio</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar tasa de cambio" name="exchange" onChange={this.onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" className="checkboxes" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Pago en dolares" onChange={this.onCheck} />

                            </Form.Group>

                            <Form.Group className="formregistrar" className="checkboxes" controlId="formBasicCheckbox">
                                <Button className="boton" variant="primary" type="submit" >
                                    Procesar pago
                                </Button>
                            </Form.Group>


                        </Form>

                    </Col>

                    <Col xs={3}>

                        { <img className="payment" src={payment} alt="" />  }
                        { <img className="payment-1" src={card} alt="" />  }

                    </Col>


                </Row>



            </ div>
        )
    }
}
