import React, { useState, useEffect, useContext, useMemo } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Table, Container, Form, ButtonGroup, Button, FormControl } from "react-bootstrap";
import { AuthContext } from '../auth/AuthContext';
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/paymentsDetails.css';
import { NavbarLoged } from '../locales/NavbarLoged';
import { NavbarMaster } from '../locales/NavbarMaster';
/* import { useHistory, useParams, Link } from 'react-router-dom';
 */


const date = new Date()


const defaultState = {
    datosDias: [],
    datosMeses: [],
    deudas: [],
    locales: [],
    busqueda: '',
    pagoBSdias: '',
    pagoBDmeses: '',
    pagoUSDdias: '',
    pagoUSDmeses: '',
    name: '',
    porDia: true,
    porMes: false,
    deudaPorMes: false
}

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


function PaymentsByMonth() {

    const [state, setState] = useState(defaultState);

    // const [startDate, setStartDate] = useState(new Date());

    const { user } = useContext(AuthContext);

    // let code = useParams().code


    useEffect(function () {

        generateToken(user.token)  // for all requests


        axios.get(`/payments/get/dayly?day=${date.getDate()}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
            .then((res) => {


                axios.get(`/payments/get/monthly?month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
                    .then((resp) => {

                        setState({
                            ...state, datosDias: res.data.pagos, pagoBSdias: res.data.totalBS, pagoUSDdias: res.data.totalUSD, datosMeses: resp.data.pagos, pagoBSmeses: resp.data.totalBS, pagoUSDmeses: resp.data.totalUSD,
                            locales: res.data.data.map(
                                item => ({ ...item, bank: item.bank.toUpperCase() }) // Todos los code a uppercase una sola vez
                            )
                        })

                    })
                    .catch((error) =>
                        console.log(error)
                    )

            })
            .catch((error) =>
                console.log(error)
            )





        //eslint-disable-next-line
    }, [])


    const datosDias = useMemo(function () {
        if (state.busqueda.length) {
            return state.datosDias.filter(local => local.bank.includes(state.busqueda))
        }
        return state.datosDias
    }, [state])

    const datosMeses = useMemo(function () {
        if (state.busqueda.length) {
            return state.datosMeses.filter(local => local.bank.includes(state.busqueda))
        }
        return state.datosMeses
    }, [state])

    const deudas = useMemo(function () {
        if (state.busqueda.length) {
            return state.deudas.filter(local => local.bank.includes(state.busqueda))
        }
        return state.deudas
    }, [state])

    const handleChangeB = e => {
        console.log(e.target.value.toUpperCase());
        setState({ ...state, busqueda: e.target.value.toUpperCase() });
    }

    const OnChangeDate = (e) => {

        const month = e.target.value;

        const dia = month.slice(8, 10);
        const mes = month.slice(5, 7);
        const year = month.slice(0, 4);

        axios.get(`/payments/get/dayly?day=${dia}&month=${mes}&year=${year}`)
            .then((res) => {

                setState({ ...state, datosDias: res.data.pagos, pagoBSdias: res.data.totalBS, pagoUSDdias: res.data.totalUSD })


            })
            .catch((error) =>
                console.log(error)
            )

    }

    const OnChangeMonth = (e) => {

        const month = e.target.value;

        const mes = month.slice(5, 7);
        const year = month.slice(0, 4);

        axios.get(`/payments/get/monthly?month=${mes}&year=${year}`)
            .then((res) => {

                setState({ ...state, datosMeses: res.data.pagos, pagoBSmeses: res.data.totalBS, pagoUSDmeses: res.data.totalUSD })

            })
            .catch((error) =>
                console.log(error)
            )

    }

    const onChangeDeuda = (e) => {

        const month = e.target.value;

        const mes = month.slice(5, 7);
        const year = month.slice(0, 4);

        axios.get(`/deudas/getDeudas?month=${mes}-${year}`)
            .then((res) => {

                setState({ ...state, deudas: res.data })

            })
            .catch((error) =>
                console.log(error)
            )

    }

    const porDia = () => {
        setState({ ...state, porDia: true, porMes: false, deudaPorMes: false })
    }

    const porMes = () => {
        setState({ ...state, porDia: false, porMes: true, deudaPorMes: false })
    }

    const porDeuda = () => {
        setState({ ...state, porDia: false, porMes: false, deudaPorMes: true })
    }

    const onSubmitBank = (e) => {
        e.preventDefault();
    }

    return (
        <>
            {user.master ? <NavbarMaster /> : <NavbarLoged />}
            <Container className="container-month">

                <ButtonGroup className="grupoBtns" aria-label="Basic example">
                    <Button onClick={porDia} className="btnPP" variant="secondary">Pagos por dia</Button>
                    <Button onClick={porMes} className="btnPP" variant="secondary">Pagos por mes</Button>
                    <Button onClick={porDeuda} className="btnPP" variant="secondary">Deudas de meses anteriores</Button>
                </ButtonGroup>

                {state.porDia ?
                    <Form onSubmit={onSubmitBank}>
                        <h2>Pagos por día</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>
                        <Form.Control type="date" className="getPayments" onChange={OnChangeDate} />

                        <br />

                        <Form.Label className="label-date">Banco</Form.Label>
                        <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" id="busqueda" onChange={handleChangeB}  />

                        <Table className="margintable" striped bordered hover size="sm" >
                            <thead>
                                <tr className='first'>
                                    <th>Total facturado en dolares ($)</th>
                                    <th>Total factutado en bolívares (Bs.S)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{state.pagoUSDdias}</td>
                                    <td>{parseFloat(state.pagoBSdias).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
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
                                    <th>Por pagar</th>
                                    <th>Registrado por</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datosDias.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.locale.code}</td>
                                            <td>{data.date}</td>
                                            <td>{data.amountUSD}</td>
                                            <td>{parseFloat(data.amountBS).toFixed(2)}</td>
                                            <td>{data.referenceNumber}</td>
                                            <td>{data.bank}</td>
                                            <td>{parseFloat(data.exchangeRate).toFixed(2)}</td>
                                            <td>{data.paymentUSD === false ? 'No' : 'Si'}</td>
                                            <td>{data.restanteUSD}</td>
                                            <td>{data.admin.username}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                    </Form>
                    :

                    <p></p>
                }

                {state.porMes ?
                    <>
                        <Form onSubmit={onSubmitBank}>

                            <h2>Pagos por mes</h2>

                            <Form.Label className="label-date">Ingresa la fecha</Form.Label>

                            <Form.Control type="month" className="getPayments" onChange={OnChangeMonth} />

                            <br />

                            <Form.Label className="label-date">Banco</Form.Label>

                            <FormControl type="text" placeholder="Ingrese el banco" className="mr-sm-2" id="busqueda" onChange={handleChangeB} />

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
                                    <td>{state.pagoUSDmeses}</td>
                                    <td>{parseFloat(state.pagoBSmeses).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
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
                                    <th>Por pagar</th>
                                    <th>Registrado por</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datosMeses.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.locale.code}</td>
                                            <td>{data.date}</td>
                                            <td>{data.amountUSD}</td>
                                            <td>{parseFloat(data.amountBS).toFixed(2)}</td>
                                            <td>{data.referenceNumber}</td>
                                            <td>{data.bank}</td>
                                            <td>{parseFloat(data.exchangeRate).toFixed(2)}</td>
                                            <td>{data.paymentUSD === false ? 'No' : 'Si'}</td>
                                            <td>{data.restanteUSD}</td>
                                            <td>{data.admin.username}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                    </>
                    :

                    <p></p>
                }


                {state.deudaPorMes ?
                    <>
                        <Form>

                            <h2>Deudas de meses anteriores</h2>

                            <Form.Label className="label-date">Ingresa la fecha</Form.Label>

                            <Form.Control type="month" className="getPayments" onChange={onChangeDeuda} />

                        </Form>

                        <Table className="margintable" striped bordered hover size="sm" >
                            <thead>
                                <tr className='first'>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Mes</th>
                                    <th>Deuda ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.deudas.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.locale.code}</td>
                                            <td>{data.locale.name}</td>
                                            <td>{`${meses[parseInt(data.month.slice(0, 2)) - 1]} ${data.month.slice(3, 7)}`}</td>
                                            <td>{data.amountUSD}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                    :
                    <p></p>}



            </Container>

        </>
    )

}


export default PaymentsByMonth


