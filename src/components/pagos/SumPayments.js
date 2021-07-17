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
function addZero(n) {
    if (n >= 10) return n;
    return "0" + n;
}

class SumPayments extends Component {

    state = {
        dataDay: {},
        dataMonths: {},
        name: '',
        mes: `${date.getDay()}-${addZero(+date.getMonth() + 1)}-${date.getFullYear()}`,
        mes2: `${addZero(+date.getMonth() + 1)}-${date.getFullYear()}`,
        startDate: new Date(),
        startMonth: new Date(),

    }


    componentDidMount() {

        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo1LCJ1c2VybmFtZSI6InZpcmdpbmlhZ3NyIiwicGFzc3dvcmQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiJ9LCJpYXQiOjE2MjY0NzEyOTcsImV4cCI6MTYyNjQ4OTI5N30.TdGl2BwEXLPKSRQn7elfNV7Eo-t18_5wiuM6mEidW20')  // for all requests


        axios.get(`/payments/sum/monthly/${this.state.mes2}`)
            .then((res) => {

                this.setState({ dataMonths: res.data })

            })
            .catch((error) =>
                console.log(error)
            )


        axios.get(`/payments/sum/dayly/${this.state.mes}`)
            .then((res) => {

                this.setState({ dataDay: res.data })

            })
            .catch((error) =>
                console.log(error)
            ) 

    }

    OnChangeSumDate = (month) => {

        try{

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
    
            this.setState({ startDate: month });
    
            axios.get(`/payments/sum/dayly/${day}-${month1}-${year}`)
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

            let month1 = addZero(1 + month.getMonth());
    
            axios.get(`/payments/sum/monthly/${month1}-${month.getFullYear()}`)
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

                        <h2>Suma de facturas (Por mes)</h2>

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

                        <h2>Suma de facturas (Por día)</h2>

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




                </Container>

            </>
        )
    }
}


export default withRouter(SumPayments)
