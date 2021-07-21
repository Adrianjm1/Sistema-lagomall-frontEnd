import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios, { generateToken } from '../../config/axios'
import { useHistory, useParams, Link } from 'react-router-dom';
import { Table, Container, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { AuthContext } from '../auth/AuthContext';
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/paymentsDetails.css';
import { NavbarLoged } from '../locales/NavbarLoged';
import SumPayments from './SumPayments';
/* import { useHistory, useParams, Link } from 'react-router-dom';
 */


const date = new Date()


const defaultState = {
     datosDias: [],
    datosMeses: [],
    name: '',
    startDate: new Date(),
    startMonth: new Date(),
}


function PaymentsByMonth() {

    const [state, setState] = useState(defaultState);

    const [startDate, setStartDate] = useState(new Date());

    const {user} = useContext(AuthContext);

    let code = useParams().code

    useEffect(function () {


        generateToken(user.token)  // for all requests
        axios.get(`/payments/get/dayly?day=${date.getDate()}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
        .then((res) => {

            setState({...state,  datosDias: res.data })

        })
        .catch((error) =>
            console.log(error)
        )


        axios.get(`/payments/get/monthly?month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {

                setState({ ...state, datosMeses: res.data })

            })
            .catch((error) =>
                console.log(error)
            )


        //eslint-disable-next-line
    }, [])


    const OnChangeDate = (month) => {

        // setState({ ...state, startMonth: month });

        axios.get(`/payments/get/dayly?day=${month.getDate()}&month=${month.getMonth() + 1}&year=${month.getFullYear()}`)
            .then((res) => {

                setState({ ...state, datosDias: res.data })
               

            })
            .catch((error) =>
                console.log(error)
            )

    }

    const OnChangeMonth = (month) => {

        // setState({ ...state, startMonth: month });

        axios.get(`/payments/get/monthly?month=${month.getMonth() + 1}&year=${month.getFullYear()}`)
            .then((res) => {

                setState({ ...state, datosMeses: res.data,  })

            })
            .catch((error) =>
                console.log(error)
            )

    }

    
        return (
            <>
            <NavbarLoged/>
                <Container className="container-month">
                    <Form>

                        <h2>Pagos por día</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                        {/* { <DatePicker className="form-control" onChange={ (date) =>{
                            setStartDate(date)
                            // OnChangeDate
                        } } selected={state.startDate}    /> } */}


 <DatePicker selected={startDate} onChange={(date) =>{   setStartDate(date)  
        OnChangeDate(date)   } } />

                    </Form>

                    <Table className="margintable" striped bordered hover size="sm" >
                        <thead>
                            <tr className='first'>
                                <th>Codigo</th>
                                <th>Monto en dolares</th>
                                <th>Monto en bolivares</th>
                                <th>Referencia</th>
                                <th>Banco</th>
                                <th>Tasa de cambio</th>
                                <th>Pago en dolares</th>
                                <th>Registrado por</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.datosDias.map(data => (
                                    <tr key={data.id}>
                                        <td>{data.locale.code}</td>
                                        <td>{data.amountUSD}</td>
                                        <td>{data.amountBS}</td>
                                        <td>{data.referenceNumber}</td>
                                        <td>{data.bank}</td>
                                        <td>{data.exchangeRate}</td>
                                        <td>{data.paymentUSD == false ? 'No' : 'Si'}</td>
                                        <td>{data.admin.username}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>



                    <Form>

                        <h2>Pagos por mes</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>

                        <DatePicker dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            selected={state.startMonth}
                            onChange={OnChangeMonth}

                        />
                    </Form>


                    <Table className="margintable" striped bordered hover size="sm" >
                        <thead>
                            <tr className='first'>
                                <th>Codigo</th>
                                <th>Fecha</th>
                                <th>Monto en dolares</th>
                                <th>Monto en bolivares</th>
                                <th>Referencia</th>
                                <th>Banco</th>
                                <th>Tasa de cambio</th>
                                <th>Pago en dolares</th>
                                <th>Registrado por</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.datosMeses.map(data => (
                                    <tr key={data.id}>
                                        <td>{data.locale.code}</td>
                                        <td>{data.createdAt.slice(0,10)}</td>
                                        <td>{data.amountUSD}</td>
                                        <td>{data.amountBS}</td>
                                        <td>{data.referenceNumber}</td>
                                        <td>{data.bank}</td>
                                        <td>{data.exchangeRate}</td>
                                        <td>{data.paymentUSD == false ? 'No' : 'Si'}</td>
                                        <td>{data.admin.username}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>

                    <hr />
                    
                    <SumPayments />




                </Container>

            </>
        )
    
}


export default PaymentsByMonth


