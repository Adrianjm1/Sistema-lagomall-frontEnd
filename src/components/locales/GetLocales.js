import React, { useState, useEffect, useMemo, useContext, useRef } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Link } from 'react-router-dom';
import { NavbarLoged } from './NavbarLoged';
import { NavbarMaster } from './NavbarMaster';
import { AuthContext } from '../auth/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Table, Container, Button, Form, FormControl } from "react-bootstrap";
import '../../assets/css/locales.css';
import { useReactToPrint } from 'react-to-print';

const date = new Date();

const defaultState = {
    name: 'React',
    busqueda: '',
    locales: [],
    startDate: '2021/07',
    mes: '',
    total: 0,
    totalPagado: 0,
    totalPronto: 0,
    porcentajePagado: 0,
    deuda: ''
};

function getDecimal(data) {

    // let strDato = data.toString();
    // let dato = strDato.split('.');

    // let datos = dato[1].slice(0,4);

    // return (`${dato[0]}.${datos}`);

    let dato = data.toFixed(2)


    return dato;

}


function GetLocales() {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const [state, setState] = useState(defaultState);
    const { user } = useContext(AuthContext);

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


    useEffect(function () {


        generateToken(user.token)  // for all requests
        axios.get('/local/table')
            .then((res) => {

                axios.get(`/payments/sum/usd?month=${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}&year=${date.getFullYear()}`)
                    .then((resp) => {

                        setState({
                            ...state,
                            total: res.data.deudas[0].total,
                            totalPronto: res.data.deudas[0].totalPronto,
                            totalPagado: resp.data.total,
                            porcentajePagado: ((parseFloat(resp.data.total) * 100) / res.data.deudas[0].total),
                            locales: res.data.data.map(
                                item => ({ ...item, code: item.code.toUpperCase() }) // Todos los code a uppercase una sola vez
                            )
                        })

                    })
                    .catch((error) => console.log(error))


            })
            .catch((error) => console.log(error))


        //eslint-disable-next-line
    }, [])




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
    



    const [startDate, setStartDate] = useState(new Date());
    const [queryDate, setQueryDate] = useState();

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
                        <Link className="btn" to={`/admin/table/${queryDate}`}>
                            <Button className="see">Buscar</Button>
                        </Link>

                    </>



                </Form>
                <div ref={componentRef}>

                    <Form.Label column sm={3}>
                        <p> Monto total:   <b> {state.total}</b></p>
                    </Form.Label>

                    <Form.Label column sm={3}>
                        <p> Monto total pagado:   <b> {state.totalPagado}</b></p>
                    </Form.Label>

                    <br />

                    <Form.Label column sm={5}>
                    <p> Porcentaje del monto total pagado:   <b> {state.porcentajePagado.toFixed(3)}%</b></p>
                    </Form.Label>

                    <Form.Label column sm={4}>
                        <p>  Monto total pronto pago: <b>{state.totalPronto}</b></p>
                    </Form.Label>


                    <br></br>
                    <br />
                    <Button onClick={handlePrint} className="see">Generar PDF</Button>

                    <br />                    <br />
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
                                        <td>{data.prontoPago}</td>
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


                </div>




            </Container>

        </>
    )
}

export default GetLocales;