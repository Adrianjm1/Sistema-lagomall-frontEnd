import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios, { generateToken } from '../../config/axios'
import { useHistory, useParams, Link } from 'react-router-dom';
import { Table, Container, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { AuthContext } from '../auth/AuthContext';
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/paymentsDetails.css';
import { NavbarLoged } from '../locales/NavbarLoged';
import { NavbarMaster } from '../locales/NavbarMaster';
import SumPayments from './SumPayments';
/* import { useHistory, useParams, Link } from 'react-router-dom';
 */


const date = new Date()


const defaultState = {
    datosDias: [],
    datosMeses: [],
    name: '',
}


function PaymentsByMonth() {

    const [state, setState] = useState(defaultState);

    const [startDate, setStartDate] = useState(new Date());

    const { user } = useContext(AuthContext);

    let code = useParams().code

    useEffect(function () {

        generateToken(user.token)  // for all requests


        axios.get(`/payments/get/dayly?day=${date.getDate()}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {


                axios.get(`/payments/get/monthly?month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
                    .then((resp) => {

                        setState({ ...state, datosMeses: resp.data, datosDias: res.data })

                    })
                    .catch((error) =>
                        console.log(error)
                    )

            })
            .catch((error) =>
                console.log(error)
            )





        //eslint-disable-next-line
    }, [])

    function getDecimal (data) {

        let dato = data.split('.');
    
        let datos = dato[1].slice(0,2);
    
        return (`${dato[0]}.${datos}`);
    
    }


    const OnChangeDate = (e) => {

        const month = e.target.value;

        const dia = month.slice(8, 10);
        const mes = month.slice(5, 7);
        const year = month.slice(0, 4);

        axios.get(`/payments/get/dayly?day=${dia}&month=${mes}&year=${year}`)
            .then((res) => {

                setState({ ...state, datosDias: res.data })


            })
            .catch((error) =>
                console.log(error)
            )

    }

    const OnChangeMonth = (e) => {

        const month = e.target.value;

        const mes = month.slice(5,7); 
        const year = month.slice(0,4); 

        axios.get(`/payments/get/monthly?month=${mes}&year=${year}`)
            .then((res) => {

                setState({ ...state, datosMeses: res.data, })

            })
            .catch((error) =>
                console.log(error)
            )

    }


    return (
        <>
            {user.master ? <NavbarMaster /> : <NavbarLoged />}
            <Container className="container-month">
                <Form>

                    <h2>Pagos por día</h2>

                    <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                    <Form.Control type="date" className="getPayments" onChange={OnChangeDate} />

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
                            state.datosDias.map(data => (
                                <tr key={data.id}>
                                    <td>{data.locale.code}</td>
                                    <td>{data.date}</td>
                                    <td>{data.amountUSD}</td>
                                    <td>{getDecimal(data.amountBS)}</td>
                                    <td>{data.referenceNumber}</td>
                                    <td>{data.bank}</td>
                                    <td>{getDecimal(data.exchangeRate)}</td>
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

                    <Form.Control type="month" className="getPayments" onChange={OnChangeMonth} />

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
                                    <td>{data.date}</td>
                                    <td>{data.amountUSD}</td>
                                    <td>{getDecimal(data.amountBS)}</td>
                                    <td>{data.referenceNumber}</td>
                                    <td>{data.bank}</td>
                                    <td>{getDecimal(data.exchangeRate)}</td>
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


