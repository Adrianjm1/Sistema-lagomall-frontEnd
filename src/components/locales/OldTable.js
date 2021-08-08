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
    porcentajePagado: 0,
    deuda:'',
}


function Oldtable() {

    let mes = useParams().mes

    let ms = Date.parse(mes);
    let fecha = new Date(ms);


    const [state, setState] = useState(defaultState);

    const locales = useMemo(function () {
        if (state.busqueda.length) {
            return state.locales.filter(local => local.code.includes(state.busqueda))
        } else if (state.deuda === true) {
            return state.locales.filter(local => local.balance > -1)
        } else if (state.deuda === false) {
            return state.locales.filter(local => local.balance < 0)
        }else if (state.deuda === ''){
            return state.locales
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

    const conDeuda = () => {
        setState({ ...state, deuda: true });
    }
    const sinDeuda = () => {

        setState({ ...state, deuda: false });

    }
    const restart = ()=>{
        setState({ ...state, deuda: '' });
    }

    const click = () => {

        state.mes = mes
    }

    return (
        <>
            {user.master ? <NavbarMaster /> : <NavbarLoged />}

           

            <Container>

            <Form inline >
                    <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" onChange={handleChange} />
                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                    <Button className="sinDeuda" onClick={conDeuda}>Locales solventes</Button>
                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                    <Button  className="conDeuda" onClick={sinDeuda}>Locales insolventes</Button>
                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                    <Button  className="restart" onClick={restart}>Mostrar todos</Button>
                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                    <>
                        <DatePicker

                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date)
                                setQueryDate((date.getFullYear() + '-' + (1 + date.getMonth())))
                                console.log(queryDate);
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

                    </>
                </Form>

                <Form.Label column sm={3}>
                        <p> Monto total:   <b> {state.total}</b></p>
                    </Form.Label>

                    <Form.Label column sm={3}>
                        <p> Monto total pagado:   <b> {state.totalPagado}</b></p>
                    </Form.Label>

                    <Form.Label column sm={3}>
                        <p> Monto restante por pagar:   <b> {state.total - state.totalPagado}</b></p>
                    </Form.Label>

                    <br />

                    <Form.Label column sm={5}>
                        <p> Porcentaje del monto total pagado:   <b> {state.porcentajePagado.toFixed(3)}%</b></p>
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