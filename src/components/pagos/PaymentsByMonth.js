import React, { Component } from 'react'
import axios, { generateToken } from '../../config/axios'
import { withRouter } from "react-router";
import { Table, Container, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/paymentsDetails.css';
import NavbarLoged from '../locales/NavbarLoged';
/* import { useHistory, useParams, Link } from 'react-router-dom';
 */

const date = new Date()
function addZero(n) {
    if (n >= 10) return n;
    return "0" + n;
}

class PaymentsByMonth extends Component {

    state = {
        datosDias: [],
        datosMeses: [],
        name: '',
        mes: `${addZero(+date.getDay())}-${addZero(+date.getMonth() + 1)}-${date.getFullYear()}`,
        mes2: `${addZero(+date.getMonth() + 1)}-${date.getFullYear()}`,
        date: '',
        startDate: new Date(),

    }


    componentDidMount() {

        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI2NDAzNDY4LCJleHAiOjE2MjY0MjE0Njh9.S6WJYEhH8F8tqPoz8JfRSLfmjNXx8d_Wca1UJI5PaBM')  // for all requests

        axios.get(`/payments/get/month/${this.state.mes}`)
            .then((res) => {

                this.setState({ datosDias: res.data })

            })
            .catch((error) =>
                console.log(error)
            )


            axios.get(`/payments/get/monthly/${this.state.mes2}`)
            .then((res) => {

                this.setState({ datosMeses: res.data })

            })
            .catch((error) =>
                console.log(error)
            )

    }

    OnChangeDate = (month) => {

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let contador = 1;

        let mes = month.toString().slice(4, 7);
        let year = month.toString().slice(11, 15);
        let day = month.toString().slice(8, 10);

        let month1 = 0;

        months.map(item => {
            if (mes === item) {
                month1 = contador < 10 ? `0${contador}` : `${contador}`;
            }
            return contador++;
        });

        this.setState({ date: month });

        axios.get(`/payments/get/month/${day}-${month1}-${year}`)
            .then((res) => {

                this.setState({ datosDias: res.data })

            })
            .catch((error) =>
                console.log(error)
            )


        axios.get(`/payments/get/monthly/${month1}-${year}`)
            .then((res) => {

                this.setState({ datosMeses: res.data })

            })
            .catch((error) =>
                console.log(error)
            )


    }

    OnChangeMonth = (month) => {

        console.log((month.getFullYear() + '-' + (1 + month.getMonth())));
        this.setState({ startDate: month });

        let month1 = addZero(1 + month.getMonth());

        console.log(`${month1}-${month.getFullYear()}`);

        axios.get(`/payments/get/monthly/${month1}-${month.getFullYear()}`)
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

                <NavbarLoged />

                <Container className="container-month">
                    <Form>

                        <h2>Pagos por día</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                        <DatePicker className="form-control" onChange={this.OnChangeDate} selected={this.state.date} />

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
                        <DatePicker
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            selected={this.state.startDate}
                            onChange={this.OnChangeMonth}

                        />
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
                                this.state.datosMeses.map(data => (
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




                </Container>

            </>
        )
    }
}


export default withRouter(PaymentsByMonth)


