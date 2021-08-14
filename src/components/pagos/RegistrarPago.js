
import React, { useState, useContext, useEffect } from 'react'
import { Form, Col, Row, Button, Modal, ButtonGroup } from "react-bootstrap";
import axios, { generateToken } from '../../config/axios';
import payment from '../../assets/images/payment.jpg';
import card from '../../assets/images/card-1.jpg';
import swal from 'sweetalert';
import { AuthContext } from '../auth/AuthContext';


import '../../assets/css/registrar.css';
import { NavbarLoged } from '../locales/NavbarLoged';
import { NavbarMaster } from '../locales/NavbarMaster';
import RegistrarDeuda from './RegistrarDeuda';



function RegistrarPago() {


    const defaultState = {
        datos: [],
        code: '',
        amount: '',
        reference: '',
        bank: '',
        descripcion: '',
        date: '',
        pay: false,
        exchange: '',
        nota: 0,
        disable: true,
        pass: '',
        btnHide: false,
        prontoPago: '',
        pagoNormal: true,
        pagoDeuda: false

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


        axios.get(`/lagomalldata/last`)
            .then((res) => {

                if (today.getDate() > res.data[0].prontoPagoDay) {

                    setState({ ...state, prontoPago: res.data[0].prontoPagoDay, btnHide: true })

                } else {

                    setState({ ...state, prontoPago: res.data[0].prontoPagoDay, disable: false, })
                }


            })
            .catch((error) =>
                console.log(error)
            )
        //eslint-disable-next-line
    }, [])

    console.log(state.btnHide);

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




    const onInputChange = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });

        } else {
            console.log(isValid);

        }

    }

    const onUSDChange = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });

        }

    }

    const onCheck = e => {

        if (e.target.checked) {

            setState({
                ...state,
                pay: true,
            })

        } else {

            setState({
                ...state,
                pay: false,
            })
        }

    }

    const disableBtn = () => {
        setState({ ...state, disable: false })
    }

    const validatePass = () => {
        if (state.pass === password) {
            disableBtn()
            handleClose2()
        } else {
            swal({
                title: 'Error',
                text: 'Clave incorrecta',
                icon: 'error'
            });
        }
    }



    const onSubmit = async e => {

        try {

            generateToken(user.token)  // for all requests


            const res = await axios.post('/payments/make',
                {
                    code: state.code,
                    bank: state.bank.toUpperCase(),
                    amountUSD: (state.amount),
                    nota: (state.nota),
                    referenceNumber: state.reference,
                    exchangeRate: state.exchange,
                    paymentUSD: state.pay,
                    date: state.date,
                    description: state.descripcion
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

        // <Modal show={show} onHide={handleClose}>
        //     <Modal.Header closeButton>
        //         <Modal.Title></Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>Pago procesado con exito  </Modal.Body>

        // </Modal>

    }


    const pagoNormal = () => {

        setState({ ...state, pagoNormal: true, pagoDeuda: false })

    }

    const pagoDeuda = () => {

        setState({ ...state, pagoDeuda: true, pagoNormal: false })

    }

    return (

        <div className="m-0 justify-content-center">

            {user.master ? <NavbarMaster /> : <NavbarLoged />}

            <ButtonGroup className="grupoBtns" aria-label="Basic example">
                <Button onClick={pagoNormal} className="btnPPP" variant="secondary">Registrar pago</Button>
                <Button onClick={ pagoDeuda} className="btnPPP" variant="secondary">Pago de deudas</Button>
            </ButtonGroup>

            {state.pagoNormal ?


                <Row>

                    <Col xs={6}>

                        <Form className="col-auto" id="formRegistrar">

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <h1 className="title"><b>Registrar pago</b></h1>
                                <br />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Codigo de local</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar codigo" name="code" onChange={onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" placeholder="fecha" name="date" onChange={onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Monto en dolares</Form.Label>
                                <Form.Control type="text" pattern="[0-9.]{0,13}" placeholder="Ingresar monto" name="amount" value={state.amount} onChange={onUSDChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Nota de debito</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar nota de debito" pattern="[0-9.]{0,13}" name="nota" value={state.nota} onChange={onInputChange} disabled={state.disable} />
                            </Form.Group>
                            {state.btnHide ?
                                <Button className="boton" variant="primary" onClick={handleShow2}   >
                                    Desbloquear
                                </Button>
                                : null
                            }
                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Tasa de cambio</Form.Label>
                                <Form.Control type="text" pattern="[0-9.]{0,13}" placeholder="Ingresar tasa de cambio" name="exchange" value={state.exchange} onChange={onUSDChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Banco</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar banco" name="bank" onChange={onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Numero de referencia</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar referencia" name="reference" onChange={onInputChange} />
                            </Form.Group>

                            <Form.Group className="formregistrar" controlId="formBasicEmail">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar descripcion" name="descripcion" onChange={onInputChange} />
                            </Form.Group>


                            <Form.Group className="checkboxes" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Pago en dolares" onChange={onCheck} />

                            </Form.Group>


                            <Form.Group className="checkboxes" controlId="formBasicCheckbox">
                                <Button className="boton" variant="primary" onClick={validaCampos}>
                                    Procesar pago
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirmacion</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Esta seguro/a que quiere procesar el pago al local <b> {state.code} </b> por <br />
                                        <b>{state.amount}$</b>  <br /> {state.pay === true ? 'Pagado en dolares' : 'Pagado en bolivares'}  </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cerrar
                                        </Button>
                                        <Button variant="primary" onClick={onSubmit} type="submit">
                                            Procesar pago
                                        </Button>
                                    </Modal.Footer>
                                </Modal>


                                <Modal show={show2} onHide={handleClose2}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Autorizacion</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Para realizar un pago con ProntoPago luego de la fecha pautada debe ingresar una contraseña <b> {state.code} </b> Por <br />

                                        <Form.Group className="formregistrar" controlId="formBasicEmail">

                                            <Form.Control type="password" placeholder="Ingresar contraseña" name="pass" onChange={onInputChange} />
                                        </Form.Group>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose2}>
                                            Cerrar
                                        </Button>
                                        <Button variant="primary" onClick={validatePass} type="submit">
                                            Autorizar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Form.Group>


                        </Form>

                    </Col>

                    <Col xs={3}>

                        {<img className="payment" src={payment} alt="" />}
                        {<img className="payment-1" src={card} alt="" />}

                    </Col>


                </Row>
                :
                <p></p>


                }


            <hr />
            {state.pagoDeuda?
            
        
            <RegistrarDeuda />
            :
            <p></p>
        }

        </ div>
    )

}


export default RegistrarPago;