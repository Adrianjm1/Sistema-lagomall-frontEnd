import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Link } from 'react-router-dom';
import { useParams, withRouter } from "react-router";
import { NavbarLoged } from './NavbarLoged';
import { NavbarMaster } from './NavbarMaster';
import LagoMallData from '../lagomallData/LagoMallData';
import DatePicker from 'react-datepicker';
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
    fecha: '',
    total: 0,
    totalPagado: 0,
    totalPronto: 0,
    porcentajePagado: 0
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

    const { user } = useContext(AuthContext);

    const [startDate, setStartDate] = useState(state.fecha);
    const [queryDate, setQueryDate] = useState(mes);

    useEffect(function () {


        generateToken(user.token)  // for all requests  // for all requests
        axios.get(`/local/tableMonthly/${mes}`)
            .then((res) => {

                const monthConvertir = mes.slice(5, 6);
                let convertir = parseInt(monthConvertir);

                convertir = convertir < 10 ? `0${convertir}` : `${convertir}`;

                axios.get(`/payments/sum/usd?month=${convertir}&year=${mes.slice(0, 4)}`)
                    .then((resp) => {

                        let sumaUSD = 0;
                        let sumaPronto = 0;

                        res.data.map((item) => {

                            sumaUSD += item.monthlyUSD;
                            sumaPronto += item.prontoPago;

                        });

                        setStartDate(fecha)

                        setState({
                            ...state,
                            fecha: fecha,
                            total: sumaUSD,
                            totalPronto: sumaPronto,
                            totalPagado: resp.data.total,
                            porcentajePagado: ((parseFloat(resp.data.total) * 100) / sumaUSD),
                            locales: res.data.map(
                                item => ({ ...item, code: item.code.toUpperCase() }) // Todos los code a uppercase una sola vez
                            )
                        })

                    })
                    .catch((error) => console.log(error))

            })


            .catch((error) => console.log(error))

        //eslint-disable-next-line
    }, [state.mes])



    const handleChange = e => {
        setState({ ...state, busqueda: e.target.value.toUpperCase() });
    }

    const click = () => {

        state.mes = mes
    }

    return (
        <>
            {user.master ? <NavbarMaster /> : <NavbarLoged />}

            {user.master ? <LagoMallData /> : <></>}

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

                    {
                        user.master ?
                            <Link className="btn" to={`/master/table/${queryDate}`}>
                                <Button onClick={click} className="see">Buscar</Button>
                            </Link>
                            :
                            <Link className="btn" to={`/admin/table/${queryDate}`}>
                                <Button onClick={click} className="see">Buscar</Button>
                            </Link>
                    }

                </div>

                <Form inline>
                    <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" onChange={handleChange} />
                    <Button className="btnSearch" >Buscar</Button>
                </Form>

                <Form.Label column sm={3}>
                        <p> Monto total:   <b> {state.total}</b></p>
                    </Form.Label>

                    <Form.Label column sm={3}>
                        <p> Monto total pagado:   <b> {state.totalPagado}</b></p>
                    </Form.Label>

                    <br />

                    <Form.Label column sm={5}>
                        <p> Porcentaje del monto total pagado:   <b> {state.porcentajePagado}%</b></p>
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
                                        {
                                            (user.master === true) ?
                                                <Link className="btn" to={`/master/table/${queryDate}`}>
                                                    <Button onClick={click} className="see">Buscar</Button>
                                                </Link>
                                                :
                                                <Link className="btn" to={`/admin/table/${queryDate}`}>
                                                    <Button onClick={click} className="see">Buscar</Button>
                                                </Link>
                                        }
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