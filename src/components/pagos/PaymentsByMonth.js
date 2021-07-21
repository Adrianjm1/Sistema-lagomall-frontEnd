import React, { Component } from 'react'
import axios, { generateToken } from '../../config/axios'
import { withRouter } from "react-router";
import { Table, Container, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/paymentsDetails.css';
import { NavbarLoged } from '../locales/NavbarLoged';
import SumPayments from './SumPayments';
/* import { useHistory, useParams, Link } from 'react-router-dom';
 */

const date = new Date()

class PaymentsByMonth extends Component {

    state = {
        datosDias: [],
        datosMeses: [],
        name: '',
        startDate: new Date(),
        startMonth: new Date(),

    }


    componentDidMount() {

        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo1LCJ1c2VybmFtZSI6InZpcmdpbmlhZ3NyIiwicGFzc3dvcmQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiJ9LCJpYXQiOjE2MjY2MzIzNzMsImV4cCI6MTYyNjY1MDM3M30.671BGtEY_w7Mrod1Wte3fC_qnU_os2uFThgkHBmeuFc')  // for all requests

        axios.get(`/payments/get/dayly?day=${date.getDate()}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {

                this.setState({ datosDias: res.data })

            })
            .catch((error) =>
                console.log(error)
            )


        axios.get(`/payments/get/monthly?month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {

                this.setState({ datosMeses: res.data })

            })
            .catch((error) =>
                console.log(error)
            )

    }

    OnChangeDate = (month) => {

        this.setState({ startDate: month });

        axios.get(`/payments/get/dayly?day=${month.getDate()}&month=${month.getMonth() + 1}&year=${month.getFullYear()}`)
            .then((res) => {

                this.setState({ datosDias: res.data })

            })
            .catch((error) =>
                console.log(error)
            )

    }

    OnChangeMonth = (month) => {

        this.setState({ startMonth: month });

        axios.get(`/payments/get/monthly?month=${month.getMonth() + 1}&year=${month.getFullYear()}`)
            .then((res) => {

                this.setState({ datosMeses: res.data })

            })
            .catch((error) =>
                console.log(error)
            )

    }

    render() {
        return (
            <>

                <Container className="container-month">
                    <Form>

                        <h2>Pagos por día</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                        <DatePicker className="form-control" onChange={this.OnChangeDate} selected={this.state.startDate} />

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
                                this.state.datosDias.map(data => (
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
                            selected={this.state.startMonth}
                            onChange={this.OnChangeMonth}

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
                                this.state.datosMeses.map(data => (
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
}


export default withRouter(PaymentsByMonth)


