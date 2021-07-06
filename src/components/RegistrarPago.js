import { text } from '@fortawesome/fontawesome-svg-core';
import React, { Component } from 'react'
import { Form, Modal, Button } from "react-bootstrap";
import axios, { generateToken } from '../config/axios'
import '../assets/css/registrar.css'



export default class RegistrarPago extends Component {

    state = {
        datos: [],
        code: '',
        amount: 0,
        reference: 0,
        bank: '',
        pay: true,
        exchange: 0

    }


    onChangeCode = e => {

        this.setState({ code: e.target.value })

    }

    onChangeAmount = e => {

        this.setState({ amount: e.target.value })

    }


    onCheck = e => {

        if (e.target.checked ) {
            this.setState({ pay: true })
        
        } else {

            this.setState({ pay: false })
        }

    }



    onChangeReference = e => {

        this.setState({ reference: e.target.value })

    }


    onChangeBank = e => {

        this.setState({ bank: e.target.value })

    }


    onChangeExchangeRate = e => {

        this.setState({ exchange: e.target.value })

    }



    onSubmit = async e => {

        try {


            e.preventDefault();
            console.log('dios');
            generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI1NjA1MTk5LCJleHAiOjE2MjU2MjMxOTl9.6Km_bDwr3o355JqSKSfYrM7JxHuQie4ufhI_dpXKm9g')  // for all requests

            const res = await axios.post('/payments/make',
                {
                    code: this.state.code,
                    bank: this.state.bank,
                    amountUSD:this.state.amount,
                    referenceNumber: this.state.reference,
                    exchangeRate: this.state.exchange,
                    paymentUSD: this.state.pay
                })

            console.log(res.data);

        }
        catch (error) {

            console.log(error);
        }


    }


    render() {
        return (
            <>
                <Form onSubmit={this.onSubmit} className="formulario">
                    <Form.Group className="formregistrar" controlId="formBasicEmail">
                        <Form.Label>Codigo de local</Form.Label>
                        <Form.Control type="text" placeholder="Ingresar codigo" onChange={this.onChangeCode} />
                    </Form.Group>

                    <Form.Group className="formregistrar" controlId="formBasicEmail">
                        <Form.Label>Monto en dolares</Form.Label>
                        <Form.Control type="text" placeholder="Ingresar monto" onChange={this.onChangeAmount} />
                    </Form.Group>

                    <Form.Group className="formregistrar" controlId="formBasicEmail">
                        <Form.Label>Numero de referencia</Form.Label>
                        <Form.Control type="text" placeholder="Ingresar referencia" onChange={this.onChangeReference} />
                    </Form.Group>

                    <Form.Group className="formregistrar" controlId="formBasicEmail">
                        <Form.Label>Banco</Form.Label>
                        <Form.Control type="text" placeholder="Ingresar banco" onChange={this.onChangeBank} />
                    </Form.Group>

                    <Form.Group className="formregistrar" controlId="formBasicEmail">
                        <Form.Label>Tasa de cambio</Form.Label>
                        <Form.Control type="text" placeholder="Ingresar tasa de cambio" onChange={this.onChangeExchangeRate} />
                    </Form.Group>

                    <Form.Group className="formregistrar" className="checkboxes" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Pago en dolares" onChange={this.onCheck} />

                    </Form.Group>


                    <Button className="boton" variant="primary" type="submit" >
                        Procesar pago
                    </Button>



                </Form>

            </>
        )
    }
}
