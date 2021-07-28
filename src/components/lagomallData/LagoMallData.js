import React, { useState, useEffect, useContext } from 'react'
import { Form, Col, Row, Container, Button, Modal } from "react-bootstrap";
import '../../assets/css/form.css';
import axios, { generateToken } from '../../config/axios'
import { AuthContext } from '../auth/AuthContext';
import swal from 'sweetalert';
import "react-datepicker/dist/react-datepicker.css";

const LagoMallData = () => {


    const defaultState = {
        name: 'React',
        metros: 0,
        breakeven: 0,
        condominio: 0,
        descuento: 0,
        month: '',
        render: '',
        idLG: 0
    };
    const [state, setState] = useState(defaultState);

    const { user } = useContext(AuthContext);
    // const [startDate, setStartDate] = useState(new Date());

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let count = 0;



    useEffect(function () {
        generateToken(user.token)  // for all requests


        axios.get('/lagomalldata/last')
            .then((res) => {


                setState({
                    ...state,
                    metros: res.data[0].meter,
                    breakeven: res.data[0].breakeven,
                    condominio: res.data[0].montoDeCondominio,
                    descuento: res.data[0].discount
                })


            })
            .catch((error) => console.log(error))

    }, [])


    const onInputChange = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {

            console.log(e.target.value);

            setState({ ...state, [e.target.name]: e.target.value });

        } else {
            console.log(isValid);

        }

    }


    const onGenerate = e => {


        generateToken(user.token)  // for all requests

        swal({
            text: "Desea agregar nuevos datos del mes " + state.month + " \n  " + state.breakeven + ' y ' + state.descuento,
            buttons: ["No", "Si"]
        }).then(respuesta => {
            if (respuesta) {
                

                let mess = state.month + '-02'

                axios.post('/lagomalldata/make',
                    {
                        breakeven: state.breakeven,
                        month: mess,
                        discount: state.descuento,
                        meter: 18030,
                        
                        

                    }).then(res => {

                        axios.get('/lagomalldata/last')
                            .then((resps) => {
                                setState({
                                    ...state,
                                    idLG: resps.data.id
                                    
                                })

                                console.log(resps.data);


                                axios.patch('/local/up',
                                    {
                                        month: state.month,
                                        idLGData: state.idLG,
                                       
                                    }).then(respu => {
                                        count++

                                        setState({ ...state, render: count })

                                        if (respu) {

                                            swal({
                                                title: 'Realizado',
                                                text: 'Nuevos cobros generados con exito',
                                                icon: 'success'
                                            });

                                            setTimeout(function () { handleClose() }, 1500);
                                        }

                                    }
                                    )
                                    .catch((error) => console.log(error))





                            }).catch((error) => {
                                console.log(error);
                            });


                    }).catch((error) =>
                        console.log(error)
                    );







            }
        })


        // console.log(

        //     state.breakeven + '  ' + state.descuento +  '  ' + state.month
        // );



    }


    const onConfirmation = () => {

        swal({
            text: "Esta accions solo puede generarse una vez al mes, ¿Seguro que desea continuar?",
            buttons: ["No", "Si"]
        }).then(res => {
            if (res) {
                console.log('hablame');
                handleShow()

            } else {

            }
        })

    }


    let condominio = parseInt(state.condominio);



    return (
        <div>


            <Container className="form">



                <Form  className="mt-5" >

                    <Form.Group as={Row}  id="formulariolg">
                        <Form.Label column sm={4}>
                            <b>Metraje del Centro Comercial</b>
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control value={`${state.metros}`} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}  id="formulariolg">
                        <Form.Label column sm={4}>
                            <b>Punto de Equilibrio</b>
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" value={`${state.breakeven}`} disabled />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="condomi" id="formulariolg">
                        <Form.Label column sm={4}>
                            <b>Cuota total del condominio</b>
                        </Form.Label>


                        <Col sm={2}>
                            <Form.Control type="text" className="ctotalc" value={`${condominio}`} name="condominio" disabled />
                        </Col>
                        <Col sm={1}>
                            <Form.Control className="discount" type="text" value={`${state.descuento}`} disabled />
                        </Col>
                    </Form.Group>

                    <br />

                </Form>

                <Button className="generar" variant="primary" size="lg" onClick={onConfirmation}>
                    Generar nuevas cuotas mensuales
                </Button>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nueva cuota mensual</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Punto de equilibrio</Form.Label>
                                <Form.Control type="text" placeholder="Punto de equilibrio" name="breakeven" onChange={onInputChange} />
                                <Form.Label>Descuento</Form.Label>
                                <Form.Control type="text" placeholder="Descuento" name="descuento" onChange={onInputChange} />
                                <Form.Label>Mes</Form.Label>
                                <Form.Control type="month" placeholder="Descuento" name="month" onChange={onInputChange} />


                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={onGenerate}>
                            Generar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <hr />


            </Container>









        </div>
    )
}

export default LagoMallData
