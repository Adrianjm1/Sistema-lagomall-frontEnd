import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Link } from 'react-router-dom';
import { useParams, withRouter } from "react-router";
import { NavbarLoged } from './NavbarLoged';
import LagoMallData from '../lagomallData/LagoMallData';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { Table, Container, Button, Form, FormControl } from "react-bootstrap";

import '../../assets/css/locales.css';
import { AuthContext } from '../auth/AuthContext';

const defaultState = {
    name: 'React',
    busqueda: '',
    locales: [],
    month: '2021-6',
    mes: '',
    fecha: ''
}


function Oldtable() {

    let mes = useParams().mes

    let ms = Date.parse(mes);
    let fecha = new Date(ms);


    const [state, setState] = useState(defaultState);

    const locales = useMemo(function () {
        if (state.busqueda.length) {
            return state.locales.filter(local => local.code.includes(state.busqueda))
        }

        return state.locales
    }, [state])
    const {user} = useContext(AuthContext);
    
    const [startDate, setStartDate] = useState(state.fecha);
    const [queryDate, setQueryDate] = useState();

    useEffect(function () {


        generateToken(user.token)  // for all requests  // for all requests
        axios.get(`/local/tableMonthly/${mes}`)
            .then((res) => {

                setStartDate(fecha)

                setState({
                    ...state,
                    fecha:fecha,
                    locales: res.data.map(
                        item => ({ ...item, code: item.code.toUpperCase() }) // Todos los code a uppercase una sola vez
                    )
                })
            }
            )


            .catch((error) => console.log(error))

        //eslint-disable-next-line
    }, [state.mes])

    
    
    const handleChange = e => {
        setState({ ...state, busqueda: e.target.value.toUpperCase() });
    }

    const click =()=>{
        
        state.mes = mes
    }

    return (
        <>
            <NavbarLoged />


            <Container>



                <div>
                    <DatePicker
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            setQueryDate((date.getFullYear() + '-' + (1 + date.getMonth())))

                        }}

                    />


                    <Link className="btn" to={`/admin/table/${queryDate}`}>
                        <Button onClick={click} className="see">Buscar</Button>
                    </Link>
                </div>

                <Form inline>
                    <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" onChange={handleChange} />
                    <Button className="btnSearch" >Buscar</Button>
                </Form>

                <br></br>
                <Table striped bordered hover size="sm">
                    <thead>

                        <tr className='first'>
                            <th>Locales</th>
                            <th>Propietarios</th>
                            <th>% Según documento de condominio</th>
                            <th>Cuota total en $</th>
                            <th>ProntoPago</th>
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

export default withRouter(Oldtable);