import React, { Component } from 'react'
import axios, { generateToken } from '../../config/axios'
import { useHistory, useParams, Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Table, Container, Button, Card } from "react-bootstrap";
import '../../assets/css/paymentsDetails.css';
import NavbarLoged from '../locales/NavbarLoged';


class PaymentsDetails extends Component {

    state = {
        datos: [],
        name: '',

    }


    componentDidMount() {
        const code = this.props.match.params.code;
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI2NTU4NTIyLCJleHAiOjE2MjY1NzY1MjJ9.9mS6pzWJheYOF81yhCa6GMclnSnfkW1D0VDQu0u7OkI')  // for all requests

        axios.get(`/payments/${code}`)
            .then((res) => {
                // console.log(res.data);
                this.setState({ datos: res.data })
                this.setState({ name: res.data[0].locale.name })

                // console.log(res.data[0].locale.code);

                console.log(res.data);

            })
            .catch((error) =>
                console.log(error)
            )

    }

    render() {
        return (
            <>

                <NavbarLoged />
                <Container>
                    <Card className="titlePayments">
                        <Card.Body>Detalles de pago del local  {`${this.props.match.params.code} - ${this.state.name} `}</Card.Body>
                    </Card>
                    <Table className="margintable" striped bordered hover size="sm" >
                        <thead>
                            <tr className='first'>
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
                                this.state.datos.map(data => (
                                    <tr key={data.id}>
                                        <td>{data.createdAt.slice(0, 10)}</td>
                                        <td>{data.amountUSD}</td>
                                        <td>{parseFloat(data.amountBS)}</td>
                                        <td>{data.referenceNumber}</td>
                                        <td>{data.bank}</td>
                                        <td>{data.exchangeRate}</td>
                                        <td>{data.paymentUSD == false ? 'No' : 'Si'}</td>
                                        <td>{data.admin.username}</td>
                                        {/* <td><Link className="btn"><Button className="see">Editar</Button></Link></td> */}

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


export default withRouter(PaymentsDetails)


