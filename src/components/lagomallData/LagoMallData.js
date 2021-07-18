
import React, { useState, useEffect, useMemo } from 'react'
import { Form, Col, Row, Container, } from "react-bootstrap";
import '../../assets/css/form.css';
import axios, { generateToken } from '../../config/axios'
import "react-datepicker/dist/react-datepicker.css";

const LagoMallData = () => {


    const defaultState = {
        name: 'React',
        metros: 0,
        breakeven: 0,
        condominio: 0,
        descuento: 0
    };




    const [state, setState] = useState(defaultState);


    useEffect(function () {
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo1LCJ1c2VybmFtZSI6InZpcmdpbmlhZ3NyIiwicGFzc3dvcmQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiJ9LCJpYXQiOjE2MjY2MzIzNzMsImV4cCI6MTYyNjY1MDM3M30.671BGtEY_w7Mrod1Wte3fC_qnU_os2uFThgkHBmeuFc')  // for all requests
        axios.get('/lagomalldata/last')
            .then((res) => {


                setState({
                    ...state,
                    metros: res.data[0].meter,
                    breakeven: res.data[0].breakeven,
                    condominio: res.data[0].montoDeCondominio,
                    descuento: res.data[0].discount
                })


            }
            )
            .catch((error) => console.log(error))



    }, [])
    let condominio = parseInt(state.condominio);
    


    return (
        <div>


            <Container className="form">



                <Form className="mt-5">

                    <Form.Group as={Row} controlId="formMetrajeCC">
                        <Form.Label column sm={4}>
                            <b>Metraje del Centro Comercial</b>
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control value={`${state.metros}`} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBreakeven">
                        <Form.Label column sm={4}>
                            <b>Punto de Equilibrio</b>
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control type="text" value={`${state.breakeven}`} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="condomi">
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

                <hr />


            </Container>









        </div>
    )
}

export default LagoMallData
