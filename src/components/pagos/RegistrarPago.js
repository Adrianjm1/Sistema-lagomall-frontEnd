import { text } from '@fortawesome/fontawesome-svg-core';
import React, { useState, useEffect, useMemo } from 'react'
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import axios, { generateToken } from '../../config/axios';
import payment from '../../assets/images/payment.jpg';
import card from '../../assets/images/card-1.jpg';
import swal from 'sweetalert'

import '../../assets/css/registrar.css';
import NavbarLoged from '../locales/NavbarLoged';



function RegistrarPago() {


    const defaultState = {
        datos: [],
        code: '',
        amount: 0,
        reference: '',
        bank: '',
        pay: false,
        exchange: 0

    }



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validaCampos =()=>{
         if (state.local == '' || state.referencia == '' || state.amount == ''){
            swal( {title: 'Error',
            text: 'Error campos sin completar',
            icon: 'error'
            });
           
         } else {
            handleShow();
         }
    }


    const [state, setState] = useState(defaultState);



    const onInputChange = e => {



        setState({ ...state, [e.target.name]: e.target.value })
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



    const onSubmit = async e => {


        try {
           

            

                generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI2NTU4NTIyLCJleHAiOjE2MjY1NzY1MjJ9.9mS6pzWJheYOF81yhCa6GMclnSnfkW1D0VDQu0u7OkI')  // for all requests


                const res = await axios.post('/payments/make',
                    {
                        code: state.code,
                        bank: state.bank,
                        amountUSD: state.amount,
                        referenceNumber: state.reference,
                        exchangeRate: state.exchange,
                        paymentUSD: state.pay
                    });


                   if(res.data.message ){


                       swal( {title: 'Error',
                       text: res.data.message,
                       icon: 'error'
                       });
                   }else{

                       
                    swal( {title: 'Realizado',
                            text: 'Pago realizado con exito',
                            icon: 'success'
                            });

                            setTimeout(function(){ window.location.reload(); }, 3500);
                   
                   }

          
        }
        catch (error) {

            console.log(error);
            
            swal( {title: 'Error',
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


    return (

        <div className="m-0 justify-content-center">
            <NavbarLoged />

            <>



            </>


            <Row>

                <Col xs={6}>

                    <Form className="col-auto formulario">

                        <Form.Group className="formregistrar" controlId="formBasicEmail">
                            <h1 className="title"><b>Realizar pago</b></h1>
                            <br />
                        </Form.Group>

                        <Form.Group className="formregistrar" controlId="formBasicEmail">
                            <Form.Label>Codigo de local</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar codigo" name="code" onChange={onInputChange} />
                        </Form.Group>

                        <Form.Group className="formregistrar" controlId="formBasicEmail">
                            <Form.Label>Monto en dolares</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar monto" name="amount"  onChange={onInputChange}  />
                        </Form.Group>
           
                        <Form.Group className="formregistrar" controlId="formBasicEmail">
                            <Form.Label>Numero de referencia</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar referencia" name="reference" onChange={onInputChange} />
                        </Form.Group>

                        <Form.Group className="formregistrar" controlId="formBasicEmail">
                            <Form.Label>Banco</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar banco" name="bank" onChange={onInputChange} />
                        </Form.Group>

                        <Form.Group className="formregistrar" controlId="formBasicEmail">
                            <Form.Label>Tasa de cambio</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar tasa de cambio" name="exchange" onChange={onInputChange} />
                        </Form.Group>

                        <Form.Group className="formregistrar" className="checkboxes" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Pago en dolares" onChange={onCheck} />

                        </Form.Group>

                        <Form.Group className="formregistrar" className="checkboxes" controlId="formBasicCheckbox">


                            <Button className="boton" variant="primary" onClick={validaCampos}>
                                Procesar pago
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirmacion</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Esta seguro/a que quiere procesar el pago al local <b> {state.code} </b> Por <br />
                                   <b>{state.amount}$</b>  <br /> {state.pay == true ? 'Pagado en dolares' : 'Pagado en bolivares'}  </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cerrar
                                    </Button>
                                    <Button variant="primary" type ="submit" onClick={ onSubmit} type="submit">
                                        Procesar pago
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



        </ div>
    )

}


export default RegistrarPago;