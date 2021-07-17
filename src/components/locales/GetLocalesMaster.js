import React, { useState, useEffect, useMemo } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Link } from 'react-router-dom';
import NavbarLoged from './NavbarLoged';
import LagoMallData from '../lagomallData/LagoMallData';
import DatePicker from 'react-datepicker';
import SumPayments from '../pagos/SumPayments';
import "react-datepicker/dist/react-datepicker.css";

import { Table, Container, Button, Form, FormControl } from "react-bootstrap";

import '../../assets/css/locales.css';

const defaultState = {
    name: 'React',
    busqueda: '',
    locales: [],
    startDate: '2021/07',
    mes: '',
    total: 0,
    totalPronto: 0
};

function GetLocalesMaster() {
    const [state, setState] = useState(defaultState);

    const locales = useMemo(function () {
        if (state.busqueda.length) {
            return state.locales.filter(local => local.code.includes(state.busqueda))
        }

        return state.locales
    }, [state])

    useEffect(function () {
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo1LCJ1c2VybmFtZSI6InZpcmdpbmlhZ3NyIiwicGFzc3dvcmQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiJ9LCJpYXQiOjE2MjY1NjE4NDksImV4cCI6MTYyNjU3OTg0OX0.vntu2n0dnbGcSC_0S0rbEnQ41MEK1MVIwPmTzMmJ4II')  // for all requests
        axios.get('/local/table')
            .then((res) => {



                setState({
                    ...state,
                    total: res.data.deudas[0].total,
                    totalPronto: res.data.deudas[0].totalPronto,
                    locales: res.data.data.map(
                        item => ({ ...item, code: item.code.toUpperCase() }) // Todos los code a uppercase una sola vez
                    )
                })


            }
            )
            .catch((error) => console.log(error))



        //eslint-disable-next-line
    }, [])

    const handleChange = e => {
        setState({ ...state, busqueda: e.target.value.toUpperCase() });
    }

    

    const [startDate, setStartDate] = useState(new Date());
    const [queryDate, setQueryDate] = useState();

    
    return (
        <>
            <NavbarLoged />

            <Container>
                <LagoMallData />
                <SumPayments/>

                <>
                    <DatePicker
                
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            setQueryDate((date.getFullYear() + '-' + (1 + date.getMonth())))
                            console.log(queryDate);
                        }
                        }

                    />
                    <Link className="btn" to={`/admin/table/${queryDate}`}>
                        <Button className="see">Buscar</Button>
                    </Link>

                </>

                <Form inline>
                    <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" onChange={handleChange} />
                </Form>

                <Form.Label column sm={4}>
                    <p> Monto total:   <b> {state.total}</b></p>
                </Form.Label>

                <Form.Label column sm={4}>
                    <p>  Monto total pronto pago: <b>{state.totalPronto}</b></p>
                </Form.Label>




                <br></br>
                <Table striped bordered hover size="sm">
                    <thead>

                        <tr className='first'>
                            <th>Locales</th>
                            <th>Propietarios</th>
                            <th>% Según documento de condominio</th>
                            <th>Cuota total en $</th>
                            <th>Pronto Pago</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            locales.map(data => (
                                <tr key={data.code}>
                                    <td>{data.code}</td>
                                    <td>{`${data.owner.firstName} ${data.owner.lastName}`}</td>
                                    <td>{data.percentageOfCC}</td>
                                    <td>{data.monthlyUSD}</td>
                                    <td>{data.prontoPago}</td>
                                    <td>{data.balance}</td>
                                    <td><Link className="btn" to={`/master/payments/${data.code}`}><Button className="see">Ver detalles</Button></Link>
                                    <Link className="btn"><Button className="see">Editar saldo</Button></Link></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>
            </Container>
        </>
    )
}

export default GetLocalesMaster;




  