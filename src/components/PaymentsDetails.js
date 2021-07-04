import React, { Component } from 'react'
import axios, { generateToken } from '../config/axios'
import { useHistory, useParams, Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Table, Container, Button } from "react-bootstrap";
import '../assets/css/paymentsDetails.css';


class PaymentsDetails extends Component {

    state = {
        datos: []
    }


    componentDidMount() {
        const code = this.props.match.params.code;
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI1NDM1MTEwLCJleHAiOjE2MjU0NTMxMTB9.SiGy5PFb-Ax_fQ_RAWjnqMohBnLUQes8O03-jYrd-7Y')  // for all requests

        axios.get(`/payments/${code}`)
            .then((res) => {
                this.setState({ datos: res.data })

            })
            .catch((error) =>
                console.log(error)
            )
    }

    render() {
        return (

            <Container>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr className='first'>
                            <th>Codigo de local</th>
                            <th>Fecha</th>
                            <th>Monto en dolares</th>
                            <th>Monto en bolivares</th>
                            <th>Referencia</th>
                            <th>Banco</th>
                            <th>Tasa de cambio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.datos.map(data => (
                                <tr key={data.id}>
                                    <td>{`${data.locale.code}`}</td>
                                    <td>{data.createdAt}</td>
                                    <td>{data.amountUSD}</td>
                                    <td>{data.amountBS}</td>
                                    <td>{data.referenceNumber}</td>
                                    <td>{data.bank}</td>
                                    <td>{data.exchangeRate}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>

        )
    }
}


export default withRouter(PaymentsDetails)