import React, { useState, useEffect, useMemo } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Link } from 'react-router-dom';
import NavbarLoged from './NavbarLoged';
import LagoMallData from '../lagomallData/LagoMallData';
import SumPayments from '../pagos/SumPayments';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { Table, Container, Button, Form, FormControl } from "react-bootstrap";

import '../../assets/css/locales.css';

const defaultState = {
    name: 'React',
    busqueda: '',
    locales: [],
    startDate: '2021/07',
    mes: ''
};


function GetLocales() {
    const [state, setState] = useState(defaultState);

    const locales = useMemo(function () {
        if (state.busqueda.length) {
            return state.locales.filter(local => local.code.includes(state.busqueda))
        }

        return state.locales
    }, [state])

    useEffect(function () {
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo1LCJ1c2VybmFtZSI6InZpcmdpbmlhZ3NyIiwicGFzc3dvcmQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMjZUMDA6NTI6MzYuMDAwWiJ9LCJpYXQiOjE2MjY0NzEyOTcsImV4cCI6MTYyNjQ4OTI5N30.TdGl2BwEXLPKSRQn7elfNV7Eo-t18_5wiuM6mEidW20')  // for all requests
        axios.get('/local/table')
            .then((res) =>
                setState({
                    ...state,
                    locales: res.data.map(
                        item => ({ ...item, code: item.code.toUpperCase() }) // Todos los code a uppercase una sola vez
                    )
                })
            )
            .catch((error) => console.log(error))

        //eslint-disable-next-line
    }, [])

    const handleChange = e => {
        setState({ ...state, busqueda: e.target.value.toUpperCase(), mes: 'sirilo' });
    }



    const [startDate, setStartDate] = useState(new Date());
    const [queryDate, setQueryDate] = useState();

    return (
        <>
            <NavbarLoged />


            <Container>
                <LagoMallData />
                <SumPayments />
                <hr />

                <>
                    <DatePicker
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            setQueryDate((date.getFullYear() + '-' + (1 + date.getMonth()) ))
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

                <br></br>
                <Table striped bordered hover size="sm">
                    <thead>

                        <tr className='first'>
                            <th>Locales</th>
                            <th>Propietarios</th>
                            <th>% Según documento de condominio</th>
                            <th>Cuota total en $</th>
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
                                    <td>{data.balance}</td>
                                    <td className="detalles">
                                        <Link className="btn" to={`/admin/payments/${data.code}`}>
                                            <Button className="see">Ver detalles</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>
            </Container>
        </>
    )
}

export default GetLocales;