import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios, { generateToken } from '../../config/axios'
import { withRouter } from "react-router";
import { Table, Container, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { AuthContext } from '../auth/AuthContext';
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/paymentsDetails.css';
/* import { useHistory, useParams, Link } from 'react-router-dom';
 */

const date = new Date()

const defaultState = {
    dataDay: {},
    dataMonths: {},
    name: '',

}
function SumPayments() {


    const [state, setState] = useState(defaultState);
    const { user } = useContext(AuthContext);

    useEffect(function () {

        generateToken(user.token)  // for all requests


        axios.get(`/payments/sum/monthly?month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {

                axios.get(`/payments/sum/dayly?day=${date.getDate()}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
                    .then((resp) => {

                        setState({ ...state, dataDay: resp.data, dataMonths: res.data })

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



    const OnChangeSumDate = (e) => {

        try {

            const month = e.target.value;

            const dia = month.slice(8, 10);
            const mes = month.slice(5, 7);
            const year = month.slice(0, 4);


            axios.get(`/payments/sum/dayly?day=${dia}&month=${mes}&year=${year}`)
                .then((res) => {

                    setState({ ...state, dataDay: res.data, startDate: month })

                })
                .catch((error) =>
                    console.log(error)
                )

        } catch (e) {
            console.log(e);
        }



    }

    const OnChangeSumMonth = (e) => {

        try {

            const month = e.target.value;

            const mes = month.slice(5, 7);
            const year = month.slice(0, 4);

            axios.get(`/payments/sum/monthly?month=${mes}&year=${year}`)
                .then((res) => {

                    setState({ ...state, dataMonths: res.data, startMonth: month })

                })
                .catch((error) =>
                    console.log(error)
                )

        } catch (e) {
            console.log(e);
        }



    }


    return (
        <>

            <Container className="container-month">
                <Form>

                    <h2>Suma de pagos por día</h2>

                    <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                    <Form.Control type="date" className="getPayments" onChange={OnChangeSumDate} />
                </Form>

                <Table className="margintable" striped bordered hover size="sm" >
                    <thead>
                        <tr className='first'>
                            <th>Total facturado en dolares ($)</th>
                            <th>Total factutado en bolívares (Bs.S)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{state.dataDay.totalUSD}</td>
                            <td>{state.dataDay.totalBS}</td>
                        </tr>
                    </tbody>
                </Table>

                <hr />

                <Form>

                    <h2>Suma de pagos por mes</h2>

                    <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                    <Form.Control type="month" className="getPayments" onChange={OnChangeSumMonth} />
                </Form>

                <Table className="margintable" striped bordered hover size="sm" >
                    <thead>
                        <tr className='first'>
                            <th>Total facturado en dolares ($)</th>
                            <th>Total factutado en bolívares (Bs.S)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{state.dataMonths.totalUSD}</td>
                            <td>{state.dataMonths.totalBS}</td>
                        </tr>
                    </tbody>
                </Table>

                <hr />



            </Container>

        </>
    )

}


export default SumPayments
