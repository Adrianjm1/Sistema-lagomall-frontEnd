import React, { Component } from 'react'
import axios, { generateToken } from '../config/axios'
import { withRouter } from "react-router";
import { Table, Container, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import '../assets/css/paymentsDetails.css';
/* import { useHistory, useParams, Link } from 'react-router-dom';
 */

class PaymentsByMonth extends Component {

    state = {
        datos: [],
        name: '',
        mes: new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}-${new Date().getFullYear()}` : `${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
        date: ''

    }


    componentDidMount() {

        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI2MjE0NjA4LCJleHAiOjE2MjYyMzI2MDh9.2AmacbsJCR81sZaq-HPQGf4wMNYSoec0HtUEtHgS1Xk')  // for all requests

        console.log(this.state.mes);

        axios.get(`/payments/get/month/${this.state.mes}`)
            .then((res) => {
                
                this.setState({ datos: res.data })

                console.log(res.data);

            })
            .catch((error) =>
                console.log(error)
            )

    }

    OnChangeDate = (month) => {

        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let contador = 1;
  
        let mes = month.toString().slice(4,7);
        let year = month.toString().slice(11,15);

        let month1 = 0;
  
        months.map(item => {
          if(mes === item){
            month1 = contador < 10 ? `0${contador}` : `${contador}`;
          }
          contador++;
        });
  
        this.setState({date: month});  

        axios.get(`/payments/get/month/${month1}-${year}`)
        .then((res) => {
            
            console.log(res.data);
            this.setState({ datos: res.data })

        })
        .catch((error) =>
            console.log(error)
        )
        
    
    }

    render() {
        return (

            <Container className="container-month">
                
                <Form>

                    <Form.Group className="form" controlId="searchmonth">
                        <Form.Label>Ingresa la fecha</Form.Label>
                    </Form.Group>

                    <Form.Group className="form" controlId="searchmonth">
                        <DatePicker className="form-control" onChange={this.OnChangeDate} selected={this.state.date} />
                    </Form.Group>

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
                            this.state.datos.map(data => (
                                <tr key={data.id}>
                                    <td>{data.locale.code}</td>
                                    <td>{data.createdAt.slice(0, 10)}</td>
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

        )
    }
}


export default withRouter(PaymentsByMonth)


