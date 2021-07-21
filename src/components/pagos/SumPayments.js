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
    startDate: new Date(),
    startMonth: new Date(),

}
function SumPayments() {


    const [state, setState] = useState(defaultState);
    const {user} = useContext(AuthContext);

    useEffect(function () {





        generateToken(user.token)  // for all requests
        axios.get(`/payments/sum/monthly?month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {

                setState({ ...state, dataMonths: res.data })

            })
            .catch((error) =>
                console.log(error)
            )


        axios.get(`/payments/sum/dayly?day=${date.getDate()}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {

                setState({ ...state,dataDay: res.data })

            })
            .catch((error) =>
                console.log(error)
            ) 


        //eslint-disable-next-line
    }, [])



    const OnChangeSumDate = (month) => {

        try{
    
            // setState({ ...state, startDate: month });
    
            axios.get(`/payments/sum/dayly?day=${month.getDate()}&month=${month.getMonth() + 1}&year=${month.getFullYear()}`)
                .then((res) => {
    
                    setState({...state, dataDay: res.data, startDate: month })
    
                })
                .catch((error) =>
                    console.log(error)
                )

        } catch(e){
            console.log(e);
        }



    }

    const OnChangeSumMonth = (month) => {

        try{

            // setState({ ...state, startMonth: month });
    
            axios.get(`/payments/sum/monthly?month=${month.getMonth() + 1}&year=${month.getFullYear()}`)
                .then((res) => {
    
                    setState({...state, dataMonths: res.data, startMonth: month })
    
                })
                .catch((error) =>
                    console.log(error)
                )

        } catch(e){
            console.log(e);
        }  



    }


        return (
            <>

                <Container className="container-month">
                    <Form>

                        <h2>Suma de pagos (Por mes)</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                        <DatePicker dateFormat="MMMM yyyy" showMonthYearPicker selected={state.startMonth} onChange={OnChangeSumMonth} />
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

                    <Form>

                        <h2>Suma de pagos (Por día)</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                        <DatePicker className="form-control-2" onChange={OnChangeSumDate} selected={state.startDate} />
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




                </Container>

            </>
        )
    
}


export default SumPayments
