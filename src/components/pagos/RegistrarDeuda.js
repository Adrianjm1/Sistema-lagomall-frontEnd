
import React, { useState, useContext, useEffect } from 'react'
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import axios, { generateToken } from '../../config/axios';
import swal from 'sweetalert';
import { AuthContext } from '../auth/AuthContext';


import '../../assets/css/registrar.css';



function RegistrarDeuda() {


    const defaultState = {
        datos: [],
        codeDeuda: '',
        amountDeuda: '',
        referenceDeuda: '',
        bankDeuda: '',
        dateDeuda: '',
        mesDeuda: '',
        payDeuda: false,
        exchangeDeuda: ''

    }

    const { user } = useContext(AuthContext);
    const password = 'lagomall'

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [state, setState] = useState(defaultState);
    const today = new Date();

    useEffect(function () {

        generateToken(user.token)  // for all requests

    }, [])

    const validaCampos = () => {
        if (state.local === '' || state.referencia === '' || state.amount === '') {
            swal({
                title: 'Error',
                text: 'Error campos sin completar',
                icon: 'error'
            });

        } else {
            handleShow();
        }
    }




    const onInputChangeDeuda = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });

        }

    }

    const onMonthChangeDeuda = e => {

        const month = e.target.value.slice(5, 8);
        const year = e.target.value.slice(0, 4);

        setState({ ...state, mesDeuda: `${month}-${year}` });


        console.log(`${month}-${year}`);


    }

    const onUSDChangeDeuda = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });

        }

    }

    const onCheckDeuda = e => {

        if (e.target.checked) {

            setState({
                ...state,
                payDeuda: true,
            })

        } else {

            setState({
                ...state,
                payDeuda: false,
            })
        }

    }


    const onSubmit = async e => {

        try {

            generateToken(user.token)  // for all requests


            const res = await axios.post('/deudas/updateDeuda',
                {
                    code: state.codeDeuda,
                    bank: state.bankDeuda,
                    amountUSD: (state.amountDeuda),
                    referenceNumber: state.referenceDeuda,
                    exchangeRate: state.exchangeDeuda,
                    paymentUSD: state.payDeuda,
                    date: state.dateDeuda,
                    month: state.mesDeuda
                });


            if (res.data.message) {


                swal({
                    title: 'Error',
                    text: res.data.message,
                    icon: 'error'
                });
            } else {


                swal({
                    title: 'Realizado',
                    text: 'Pago realizado con exito',
                    icon: 'success'
                });

                setTimeout(function () { window.location.reload(); }, 3500);

            }


        }
        catch (error) {

            console.log(error);

            swal({
                title: 'Error',
                text: 'Error, no se pudo procesar el pago',
                icon: 'error'
            });

        }


        handleClose();

    }


    return (

        <div className="m-0 deudas">

            <Form className="col-auto" id="formRegistrar">

                <Form.Group className="formregistrar" controlId="formBasicEmail">
                    <h1 className="title"><b>Pago de deudas</b></h1>
                    <br />
                </Form.Group>

                <Form.Group className="formregistrar" controlId="formBasicEmail">
                    <Form.Label>Codigo de local</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar codigo" name="codeDeuda" onChange={onInputChangeDeuda} />
                </Form.Group>

                <Form.Group className="formregistrar" controlId="formBasicEmail">
                    <Form.Label>Fecha del pago</Form.Label>
                    <Form.Control type="date" placeholder="fecha" name="dateDeuda" onChange={onInputChangeDeuda} />
                </Form.Group>

                <Form.Group className="formregistrar" controlId="formBasicEmail">
                    <Form.Label>Mes de deuda a pagar</Form.Label>
                    <Form.Control type="month" placeholder="fecha" name="mesDeuda" onChange={onMonthChangeDeuda} />
                </Form.Group>

                <Form.Group className="formregistrar" controlId="formBasicEmail">
                    <Form.Label>Monto en dolares</Form.Label>
                    <Form.Control type="text" pattern="[0-9.]{0,13}" placeholder="Ingresar monto" name="amountDeuda" value={state.amount} onChange={onUSDChangeDeuda} />
                </Form.Group>

                <Form.Group className="formregistrar" controlId="formBasicEmail">
                    <Form.Label>Tasa de cambio</Form.Label>
                    <Form.Control type="text" pattern="[0-9.]{0,13}" placeholder="Ingresar tasa de cambio" name="exchangeDeuda" value={state.exchange} onChange={onUSDChangeDeuda} />
                </Form.Group>

                <Form.Group className="formregistrar" controlId="formBasicEmail">
                    <Form.Label>Banco</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar banco" name="bankDeuda" onChange={onInputChangeDeuda} />
                </Form.Group>

                <Form.Group className="formregistrar" controlId="formBasicEmail">
                    <Form.Label>Numero de referencia</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar referencia" name="referenceDeuda" onChange={onInputChangeDeuda} />
                </Form.Group>

                <Form.Group className="checkboxes" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Pago en dolares" onChange={onCheckDeuda} />

                </Form.Group>


                <Form.Group className="checkboxes" controlId="formBasicCheckbox">
                    <Button className="boton" variant="primary" onClick={validaCampos}>
                        Procesar pago
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmacion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Esta seguro/a que quiere procesar el pago a la <b>DEUDA</b> del local <b> {state.codeDeuda} </b> de <b> {state.mesDeuda} </b> por <b>{state.amountDeuda}$</b> 
                        <br /> {state.payDeuda === true ? 'Pagado en dolares' : 'Pagado en bolivares'}  </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={onSubmit} type="submit">
                                Procesar pago
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Form.Group>


            </Form>


        </ div>
    )

}


export default RegistrarDeuda;