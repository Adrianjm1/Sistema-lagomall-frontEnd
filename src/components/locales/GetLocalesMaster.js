import React, { useState, useEffect, useMemo, useContext, useRef } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Link } from 'react-router-dom';
import { NavbarMaster } from './NavbarMaster';
import LagoMallData from '../lagomallData/LagoMallData';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../auth/AuthContext';
import { useReactToPrint } from 'react-to-print';
import "react-datepicker/dist/react-datepicker.css";

import { Table, Container, Button, Form, FormControl, Modal } from "react-bootstrap";

import '../../assets/css/locales.css';

const defaultState = {
    name: 'React',
    busqueda: '',
    locales: [],
    startDate: '2021/07',
    mes: '',
    total: 0,
    totalPronto: 0,
    porcentajePagado: 0,
    localEdit : '',
    saldoEdit: ''

};


function getDecimal(data) {

    const datos = data.toString();

    return (datos.slice(0, 6));

}


const date = new Date();

function GetLocalesMaster() {

    let codeToEdit = '';

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, setState] = useState(defaultState);


    const { user } = useContext(AuthContext);



    const locales = useMemo(function () {
        if (state.busqueda.length) {
            return state.locales.filter(local => local.code.includes(state.busqueda))
        }

        return state.locales
    }, [state])

    useEffect(function () {
        generateToken(user.token)  // for all requests
        axios.get('/local/table')
            .then((res) => {

                axios.get(`/payments/sum/usd?month=${date.getMonth() + 1}&year=${date.getFullYear()}`)
                    .then((resp) => {

                        setState({
                            ...state,
                            total: res.data.deudas[0].total,
                            totalPronto: res.data.deudas[0].totalPronto,
                            porcentajePagado: ((parseFloat(resp.data.total) * 100) / res.data.deudas[0].total),
                            locales: res.data.data.map(
                                item => ({ ...item, code: item.code.toUpperCase() }) // Todos los code a uppercase una sola vez
                            )
                        })

                    })
                    .catch((error) => console.log(error))


            }
            )
            .catch((error) => console.log(error))



        //eslint-disable-next-line
    }, [])

    const handleChange = e => {
        setState({ ...state, busqueda: e.target.value.toUpperCase() });
    }

    const editarSaldo= (local, saldo)=>{

        setState({  ...state, localEdit: local, saldoEdit: saldo })



    }



    const [startDate, setStartDate] = useState(new Date());
    const [queryDate, setQueryDate] = useState();



    return (
        <>
            <NavbarMaster />

            <Container>
                <LagoMallData />

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

                <div ref={componentRef}>

                    <Form.Label column sm={3}>
                        <p> Monto total:   <b> {state.total}</b></p>
                    </Form.Label>

                    <Form.Label column sm={4}>
                        <p>  Monto total pronto pago: <b>{state.totalPronto}</b></p>
                    </Form.Label>

                    <Form.Label column sm={5}>
                        <p> Porcentaje del monto total pagado:   <b> {getDecimal(state.porcentajePagado)}%</b></p>
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
                                        <td >{data.monthlyUSD}</td>
                                        <td>{data.prontoPago}</td>
                                        <td>{data.balance}</td>
                                        <td className="detalles">
                                            <Link className="btn" to={`/master/payments/${data.code}`}>
                                                <Button className="see">Ver detalles</Button>
                                            </Link>

                                            <Button onClick={()=>{ handleShow(); editarSaldo(data.code, data.balance)} } className="see">Editar saldo</Button>
                                        </td>
                                    </tr>


                                ))
                            }
                        </tbody>



                    </Table>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modificacion de saldo del local  <b> {state.localEdit} </b> </Modal.Title>
                        </Modal.Header>
                        <Modal.Body> 
                        <br/>
                        Saldo actual : <b>  {state.saldoEdit} </b>
                        <br/>
                        <Form.Group className="formregistrar" controlId="formBasicEmail">
                            <Form.Label>Nuevo saldo</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar saldo" name="bank"  />
                        </Form.Group>



                         </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button variant="primary" type="submit">
                                Procesar pago
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>

            </Container>
        </>
    )
}

export default GetLocalesMaster;




