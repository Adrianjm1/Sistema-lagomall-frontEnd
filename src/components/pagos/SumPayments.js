import React, { Component } from 'react'
import axios, { generateToken } from '../../config/axios'
import { withRouter } from "react-router";
import { Table, Container, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/paymentsDetails.css';
/* import { useHistory, useParams, Link } from 'react-router-dom';
 */

const date = new Date()

class SumPayments extends Component {

    state = {
        dataDay: {},
        dataMonths: {},
        name: '',
        startDate: new Date(),
        startMonth: new Date(),

    }


    componentDidMount() {

        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo1LCJ1c2VybmFtZSI6InZpcmdpbmlhZ3NyIiwicGFzc3dvcmQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiJ9LCJpYXQiOjE2MjY2MzIzNzMsImV4cCI6MTYyNjY1MDM3M30.671BGtEY_w7Mrod1Wte3fC_qnU_os2uFThgkHBmeuFc')  // for all requests


        axios.get(`/payments/sum/monthly?month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {

                this.setState({ dataMonths: res.data })

            })
            .catch((error) =>
                console.log(error)
            )


        axios.get(`/payments/sum/dayly?day=${date.getDate()}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {

                this.setState({ dataDay: res.data })

            })
            .catch((error) =>
                console.log(error)
            ) 

    }

    OnChangeSumDate = (month) => {

        try{
    
            this.setState({ startDate: month });
    
            axios.get(`/payments/sum/dayly?day=${month.getDate()}&month=${month.getMonth() + 1}&year=${month.getFullYear()}`)
                .then((res) => {
    
                    this.setState({ dataDay: res.data })
    
                })
                .catch((error) =>
                    console.log(error)
                )

        } catch(e){
            console.log(e);
        }



    }

    OnChangeSumMonth = (month) => {

        try{

            this.setState({ startMonth: month });
    
            axios.get(`/payments/sum/monthly?month=${month.getMonth() + 1}&year=${month.getFullYear()}`)
                .then((res) => {
    
                    this.setState({ dataMonths: res.data })
    
                })
                .catch((error) =>
                    console.log(error)
                )

        } catch(e){
            console.log(e);
        }  



    }

    render() {
        return (
            <>

                <Container className="container-month">
                    <Form>

                        <h2>Suma de pagos (Por mes)</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                        <DatePicker dateFormat="MMMM yyyy" showMonthYearPicker selected={this.state.startMonth} onChange={this.OnChangeSumMonth} />
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
                                <td>{this.state.dataMonths.totalUSD}</td>
                                <td>{this.state.dataMonths.totalBS}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <hr />

                    <Form>

                        <h2>Suma de pagos (Por día)</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                        <DatePicker className="form-control-2" onChange={this.OnChangeSumDate} selected={this.state.startDate} />
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
                                <td>{this.state.dataDay.totalUSD}</td>
                                <td>{this.state.dataDay.totalBS}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <hr />




                </Container>

            </>
        )
    }
}


export default withRouter(SumPayments)
