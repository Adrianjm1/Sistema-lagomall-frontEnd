import React, { useState, useEffect, useContext, useMemo } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Table, Container, Form, ButtonGroup, Button, FormControl } from "react-bootstrap";
import { AuthContext } from '../auth/AuthContext';
import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/css/paymentsDetails.css';
import { NavbarLoged } from '../locales/NavbarLoged';
import { NavbarMaster } from '../locales/NavbarMaster';
import formatNumber from '../../helpers/helpers';


import { saveAs } from 'file-saver';

/* import { useHistory, useParams, Link } from 'react-router-dom';
 */


const date = new Date()
const today = `${date.getDate()}-${date.getMonth()}`


const defaultState = {
    datosDias: [],
    datosMeses: [],
    deudas: [],
    locales: [],
    busqueda: '',
    pagoBSdias: '',
    pagoBSmeses: '',
    pagoUSDdias: '',
    pagoUSDmeses: '',
    sumatoriaTotalDias: '',
    sumatoriaTotalMeses: '',
    sumatoriaDeudas: '',
    cuotaMes: '',
    porcentajeMes: '',
    name: '',
    porDia: true,
    porMes: false,
    deudaPorMes: false,
    porRango: false,
    deudaDesde: false,
    pdfDay: '',
    pdfMonth: '',
    pdfDeuda: '',
    pdfDeudaDesde: ''


}

const rangeStatee = {
    rango1: '',
    rango2: '',
    sumDeudasRango: '',
    deudasRango: [],
    pdfDeudaRango: '',
    pdfDeudaRango2: '',
    deudaDesde: [],
    pdfDeudaDesde: ''

}

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


function PaymentsByMonth() {

    const [state, setState] = useState(defaultState);

    const [rangeState, setRangeState] = useState(rangeStatee);

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

    const handleChangeBDias = e => {
        console.log(e.target.value.toUpperCase());

        let suma = 0;
        let sumaBS = 0;
        let sumaUSD = 0;
        let datos = state.datosDias.filter(local => local.bank.includes(e.target.value.toUpperCase()));

        datos.map(data => {

            if (data.paymentUSD === true) {
                sumaUSD = sumaUSD + parseFloat(data.amountUSD);
            } else {
                sumaBS = sumaBS + (parseFloat(data.amountUSD) * parseFloat(data.exchangeRate));
            }

            suma = suma + parseFloat(data.amountUSD);

        });

        setState({ ...state, busqueda: e.target.value.toUpperCase(), pagoBSdias: sumaBS, pagoUSDdias: sumaUSD, sumatoriaTotalDias: suma });


    }

    const handleChangeBMeses = e => {
        console.log(e.target.value.toUpperCase());

        let suma = 0;
        let sumaBS = 0;
        let sumaUSD = 0;
        let datos = state.datosMeses.filter(local => local.bank.includes(e.target.value.toUpperCase()));

        datos.map(data => {

            if (data.paymentUSD === true) {
                sumaUSD = sumaUSD + parseFloat(data.amountUSD);
            } else {
                sumaBS = sumaBS + (parseFloat(data.amountUSD) * parseFloat(data.exchangeRate));
            }

            suma = suma + parseFloat(data.amountUSD);

        });

        setState({ ...state, busqueda: e.target.value.toUpperCase(), pagoBSmeses: sumaBS, pagoUSDmeses: sumaUSD, sumatoriaTotalMeses: suma });


    }

    const OnChangeDate = (e) => {

        const month = e.target.value;

        const dia = month.slice(8, 10);
        const mes = month.slice(5, 7);
        const year = month.slice(0, 4);

        axios.get(`/payments/get/dayly?day=${dia}&month=${mes}&year=${year}`)
            .then((res) => {

                setState({ ...state, datosDias: res.data.pagos, pagoBSdias: res.data.totalBS, pagoUSDdias: res.data.totalUSD, sumatoriaTotalDias: res.data.sumaTotal, pdfDay: month })


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

                setState({ ...state, datosMeses: res.data.pagos, pagoBSmeses: res.data.totalBS, pagoUSDmeses: res.data.totalUSD, sumatoriaTotalMeses: res.data.sumaTotal, pdfMonth: month })

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

                if (res.data.ok == false) {
                    setState({ ...state, deudas: [], cuotaMes: '', porcentajeMes: '', sumatoriaDeudas: '', pdfDeuda: '' })
                } else{
                    setState({ ...state, deudas: res.data.data, cuotaMes: res.data.suma, porcentajeMes: res.data.porcentaje, sumatoriaDeudas: res.data.sumDeudas, pdfDeuda: month })

                }

            })
            .catch((error) =>
                console.log(error)
                //setState({ ...state, deudas: [], cuotaMes: '', porcentajeMes: '', sumatoriaDeudas: '', pdfDeuda: '' })

            )

    }


    const onChangeDeudaRango = () => {

        const rango1 = rangeState.rango1;
        const rango2 = rangeState.rango2;

        const mes1 = rango1.slice(5, 7);
        const year1 = rango1.slice(0, 4);

        const mes2 = rango2.slice(5, 7);
        const year2 = rango2.slice(0, 4);

        // console.log(`Se va  ahacer la consulta de ${mes1}-${year1} - hasta ${mes2}-${year2}`);

        axios.get(`/deudas/getDeudasRango?month1=${mes1}-${year1}&month2=${mes2}-${year2}`)
            .then((res) => {

                let sum = 0;

                for (let i = 0; i < res.data.length; i++) {

                    sum = sum + parseFloat(res.data[i].deudaTotal);

                }

                setRangeState({ ...rangeState, deudasRango: res.data, sumDeudasRango: `${sum}`, })

            })
            .catch((error) =>
                console.log(error)
            )
    }


    const onChangeDeudaDesde = (e) => {


        const month = e.target.value;

        const mes = month.slice(5, 7);
        const year = month.slice(0, 4);
        const mesQuery = `${mes}-${year}`;
        console.log(mesQuery);

        axios.get(`/deudas/getDeudasDesde?month=${mesQuery}`)
            .then((res) => {

                setRangeState({ ...rangeState, deudaDesde: res.data, pdfDeudaDesde: month })

            })
            .catch((error) =>
                console.log(error)
            )

    }

    const rango1 = (e) => {
        setRangeState({ ...rangeState, [e.target.name]: e.target.value });
        console.log(e.target.value);
    }


    const establecer = () => {
        if (rangeState.rango1 === '' || rangeState.rango2 === '') {
            console.log('TROLEANDO a mi pana');
        } else {
            console.log('Desde ' + meses[parseInt(rangeState.rango1.slice(5, 7) - 1)] + ' ' + rangeState.rango1.slice(0, 4) + '  Hasta ' + meses[parseInt(rangeState.rango2.slice(5, 7) - 1)] + ' ' + rangeState.rango2.slice(0, 4));
            onChangeDeudaRango();


        }

    }


    const porDia = () => {
        setState({ ...state, porDia: true, porMes: false, deudaPorMes: false, porRango: false, deudaDesde: false })
    }

    const porMes = () => {
        setState({ ...state, porDia: false, porMes: true, deudaPorMes: false, porRango: false, deudaDesde: false })
    }

    const porDeuda = () => {
        setState({ ...state, porDia: false, porMes: false, deudaPorMes: true, porRango: false, deudaDesde: false })
    }

    const porDeudaRango = () => {
        setState({ ...state, porDia: false, porMes: false, deudaPorMes: false, porRango: true, deudaDesde: false })
    }

    const deudaDesde = () => {
        setState({ ...state, porDia: false, porMes: false, deudaPorMes: false, porRango: false, deudaDesde: true })
    }

    const onSubmitBank = (e) => {
        e.preventDefault();
    }


    const pdfff = () => {


        const dia = state.pdfDay.slice(8, 10);
        const mes = state.pdfDay.slice(5, 7);
        const year = state.pdfDay.slice(0, 4);


        axios.get(`/pdf/pagos/dia?day=${dia}&month=${mes}&year=${year}`, { responseType: 'blob' })
            .then((res) => {
                saveAs(res.data, `PagoPorDia-${today}.pdf`);
            })
            .catch((error) => console.log(error))
    }

    const pdfff2 = () => {

        const mes = state.pdfMonth.slice(5, 7);
        const year = state.pdfMonth.slice(0, 4);

        // console.log(mes + ' aaaaa ' + year);

        axios.get(`/pdf/pagos/mes?month=${mes}&year=${year}`, { responseType: 'blob' })
            .then((res) => {
                saveAs(res.data, `PagoPorMes-${today}.pdf`);
            })
            .catch((error) => console.log(error))
    }


    const pdfff3 = () => {
        const mes = state.pdfDeuda.slice(5, 7);
        const year = state.pdfDeuda.slice(0, 4);

        const SMES = `${mes}-${year}`

        console.log(mes);

        axios.get(`/pdf/deudas/mes?month=${SMES}`, { responseType: 'blob' })
            .then((res) => {
                saveAs(res.data, `Deudas-${today}.pdf`);
            })
            .catch((error) => console.log(error))
    }


    const pdfff4 = () => {

        const rg1 = rangeState.rango1.slice(0, 4)
        const rg2 = rangeState.rango1.slice(5, 8)
        const mes1 = rg2 + '-' + rg1

        const rg12 = rangeState.rango2.slice(0, 4)
        const rg22 = rangeState.rango2.slice(5, 8)
        const mes2 = rg22 + '-' + rg12


        axios.get(`/pdf/deudas/rango?month1=${mes1}&month2=${mes2}`, { responseType: 'blob' })
            .then((res) => {
                saveAs(res.data, `DeudaRango-${today}.pdf`);
            })
            .catch((error) => console.log(error))
    }


    const pdfff5 = () => {
        const mes = rangeState.pdfDeudaDesde.slice(5, 7);
        const year = rangeState.pdfDeudaDesde.slice(0, 4);

        const SMES = `${mes}-${year}`

        console.log(SMES);

        axios.get(`/pdf/deudas/desde?month=${SMES}`, { responseType: 'blob' })
            .then((res) => {
                saveAs(res.data, `Deudas-${today}.pdf`);
            })
            .catch((error) => console.log(error))
    }







    return (
        <>
            {user.master ? <NavbarMaster /> : <NavbarLoged />}
            <Container className="container-month">

                <ButtonGroup className="grupoBtns" aria-label="Basic example">
                    <Button onClick={porDia} className="btnPP" variant="secondary">Pagos por dia</Button>
                    <Button onClick={porMes} className="btnPP" variant="secondary">Pagos por mes</Button>
                    <Button onClick={porDeuda} className="btnPP" variant="secondary">Deudas de meses anteriores</Button>
                    <Button onClick={porDeudaRango} className="btnPP" variant="secondary">Deudas por rango</Button>
                    <Button onClick={deudaDesde} className="btnPP" variant="secondary">Deudas desde un mes</Button>
                </ButtonGroup>

                <p></p>
                {state.porDia ?
                    <Form onSubmit={onSubmitBank}>
                        <h2>Pagos por día</h2>

                        <Form.Label className="label-date">Ingresa la fecha</Form.Label>

                        <Form.Control type="date" className="getPayments" onChange={OnChangeDate} />

                        <br />

                        <Form.Label className="label-date">Banco</Form.Label>

                        <FormControl type="text" placeholder="Busqueda por banco" className="mr-sm-2" id="busqueda" onChange={handleChangeBDias} />

                        <br />
                        <Button onClick={pdfff} className="see">Generar PDF</Button>

                        <Table className="margintable" striped bordered hover size="sm" >
                            <thead>
                                <tr className='first'>
                                    <th>Facturado en dolares ($)</th>
                                    <th>Factutado en bolívares (Bs.S)</th>
                                    <th>Total ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{formatNumber(parseFloat(state.pagoUSDdias))}</td>
                                    <td>{formatNumber(parseFloat(state.pagoBSdias).toFixed(2))}</td>
                                    <td>{formatNumber(parseFloat(state.sumatoriaTotalDias))}</td>
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
                                            <td>{formatNumber(parseFloat(data.amountUSD))}</td>
                                            <td>{formatNumber(parseFloat(data.amountBS).toFixed(2))}</td>
                                            <td>{data.referenceNumber}</td>
                                            <td>{data.bank}</td>
                                            <td>{formatNumber(parseFloat(data.exchangeRate).toFixed(2))}</td>
                                            <td>{data.paymentUSD === false ? 'No' : 'Si'}</td>
                                            <td>{formatNumber(parseFloat(data.restanteUSD))}</td>
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

                            <FormControl type="text" placeholder="Busqueda por banco" className="mr-sm-2" id="busqueda" onChange={handleChangeBMeses} />

                            <br />
                            <Button onClick={pdfff2} className="see">Generar PDF</Button>

                        </Form>

                        <Table className="margintable" striped bordered hover size="sm" >
                            <thead>
                                <tr className='first'>
                                    <th>Facturado en dolares ($)</th>
                                    <th>Factutado en bolívares (Bs.S)</th>
                                    <th>Total ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{formatNumber(parseFloat(state.pagoUSDmeses))}</td>
                                    <td>{formatNumber(parseFloat(state.pagoBSmeses).toFixed(2))}</td>
                                    <td>{formatNumber(parseFloat(state.sumatoriaTotalMeses))}</td>
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
                                            <td>{formatNumber(parseFloat(data.amountUSD))}</td>
                                            <td>{formatNumber(parseFloat(data.amountBS).toFixed(2))}</td>
                                            <td>{data.referenceNumber}</td>
                                            <td>{data.bank}</td>
                                            <td>{formatNumber(parseFloat(data.exchangeRate).toFixed(2))}</td>
                                            <td>{data.paymentUSD === false ? 'No' : 'Si'}</td>
                                            <td>{formatNumber(parseFloat(data.restanteUSD))}</td>
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

                        <hr />



                        <p></p>
                        <p>Total en deudas del mes: <b>{state.sumatoriaDeudas}$</b></p>
                        <p>Cuota total del mes: <b>{state.cuotaMes}$</b></p>
                        <p>Porcentaje pagado con respecto a la cuota total del mes: <b>{100 - parseFloat(state.porcentajeMes).toFixed(2)}%</b></p>


                        <br />
                        <Button onClick={pdfff3} className="see">Generar PDF</Button>

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
                                            <td>{formatNumber(parseFloat(data.amountUSD))}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                    :
                    <p></p>

                }

                {state.porRango ?
                    <>

                        <Form>

                            <h2>Deudas por rango</h2>

                        </Form>

                        <Form inline>

                            <Form.Label className="label-date">Establecer rango desde</Form.Label>

                            <Form.Control type="month" name="rango1" className="getPayments" onChange={rango1} />                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>

                            <Form.Label className="label-date">Hasta </Form.Label>                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                            <Form.Control type="month" name="rango2" className="getPayments" onChange={rango1} />                     <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                            <Button onClick={establecer}>Establecer</Button>

                        </Form>
                        <hr />

                        <p></p>
                        <p>Total en deudas en el rango establecido: <b>{formatNumber((parseFloat(rangeState.sumDeudasRango) * -1))}</b></p>

                        <br />
                        <Button onClick={pdfff4} className="see">Generar PDF</Button>

                        <Table className="margintable" striped bordered hover size="sm" >
                            <thead>
                                <tr className='first'>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Deuda ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rangeState.deudasRango.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.locale.code}</td>
                                            <td>{data.locale.name}</td>
                                            <td>{formatNumber(parseFloat(data.deudaTotal))}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table> </> :
                    <p></p>


                }


                {state.deudaDesde ?
                    <>

                        <Form>

                            <h2>Deudas desde algun mes</h2>

                        </Form>

                        <Form inline>

                            <Form.Label className="label-date">Establecer morosos desde el mes de </Form.Label>

                            <Form.Control type="month" className="getPayments" onChange={onChangeDeudaDesde} />                    <p>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>

                            {/* <Button onClick={establecer}>Establecer</Button> */}

                        </Form>
                        <hr />

                        <p></p>
                        {/* <p>Total en deudas en el rango establecido: <b>{formatNumber((parseFloat(rangeState.sumDeudasRango) * -1))}</b></p> */}

                        <br />
                        <Button onClick={pdfff5} className="see">Generar PDF</Button>

                        <Table className="margintable" striped bordered hover size="sm" >
                            <thead>
                                <tr className='first'>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Deuda ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rangeState.deudaDesde.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.locale.code}</td>
                                            <td>{data.locale.name}</td>
                                            <td>{formatNumber(parseFloat(data.deudaTotal))}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table> </> :
                    <p></p>


                }
















            </Container>

        </>
    )

}


export default PaymentsByMonth


