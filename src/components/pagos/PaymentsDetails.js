import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios, { generateToken } from '../../config/axios'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { Table, Container, Card, Button, Modal, Form } from "react-bootstrap";
import '../../assets/css/paymentsDetails.css';
import { NavbarLoged } from '../locales/NavbarLoged';
import { NavbarMaster } from '../locales/NavbarMaster';
import numberWithCommas from '../../helpers/helpers';
import swal from 'sweetalert';




const defaultState = {
    datos: [],
    name: '',
    code: '',
    localEdit: '',
    saldoEdit: 0,
    idEdit: 0,
    upCode: '',
    toDelete: '',
    idOwner: '',
    nota: ''

}

const datosLocalState = {
    owner: '',
    ownerLast: '',
    phone: ''
}

function PaymentsDetails() {

    const [state, setState] = useState(defaultState);
    const [datoState, setDatoState] = useState(datosLocalState);

    const { user } = useContext(AuthContext);
    let code = useParams().code


    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const datos = useMemo(function () {
        return state.datos
    }, [state])

    const OwnerSetter = ()=>{

        console.log('Me ejecuto bro');

        axios.get(`/owner/1`)
        .then((res) => {
            // console.log(res.data);
            console.log(res.data);
            setDatoState({ ...datoState, owner: res.data.firstName, ownerLast: res.data.lastName, phone: res.data.phone })

            // console.log(res.data[0].locale.code);

            // console.log(res.data);

        })
        .catch((error) =>
            console.log(error)
        )


    }

    useEffect(function () {



        generateToken(user.token)  // for all requests
        axios.get(`/payments/${code}`)
            .then((res) => {
                // console.log(res.data);
                setState({ ...state, datos: res.data, code: code, name: res.data[0].locale.name, idOwner: res.data[0].locale.idOwner })

                // console.log(res.data[0].locale.code);

                // console.log(res.data);

            })
            .then(()=>{
                OwnerSetter();
            })
            .catch((error) =>
                console.log(error)
            )



        //eslint-disable-next-line
    }, [])

    const deleteP = (datos) => {
        console.log(datos);
        swal({
            text: "Esta accion no se puede revertir, esta seguro que quiere continuar?",
            buttons: ["No", "Si"]
        }).then((res) => {
            if (res) {
               

                console.log(`Se esta borrando  + ${parseInt(datos.amountUSD) + parseInt(datos.nota)}`);



                axios.get(`/local/findOne?idLocal=${datos.idLocal}`)
                    .then((respue) => {


                        const balance =  parseInt(respue.data.balance ) + parseInt(datos.amountUSD) + parseInt(datos.nota) ;

                        // (datos.amountUSD * -1) + respue.data.balance
                        // parseInt(datos.amountUSD, base);
                        console.log(`Se esta borrando ${respue.data.balance} + ${parseInt(datos.amountUSD) + parseInt(datos.nota)}`);
                        
                        axios.patch('/local/upBalance',
                            {
                                code: respue.data.code,
                                balance: balance
                            })
                            .then((resp) => {

                                axios.delete(`/payments/delete/${datos.id}`)
                                    .then((res) => {
                                        swal({
                                            text: "Pago anulado con exito!",
                                        })
                                    })
                                    .catch((error) =>
                                        console.log(error)
                                    )
                            });
                    })
                    .catch((error) => console.log(error))
            } else {
                console.log('No sirvio');
            }
        })



    }


    const onInputChange = e => {

        setState({ ...state, [e.target.name]: e.target.value });

    }

    const editarSaldo = (local, saldo, id) => {

        setState({ ...state, localEdit: local, saldoEdit: saldo, idEdit: id })

    }

    const upCode = async () => {

        const res = await axios.patch('/payments/upCode',
            {
                code: state.upCode,
                amount: state.saldoEdit,
                id: state.idEdit
            });

        if (res.data.message) {


            swal({
                title: 'Error',
                text: res.data.message,
                icon: 'error'
            });
        } else {

            console.log(res);
            swal({
                title: 'Realizado',
                text: 'Actualizacion realizada con exito',
                icon: 'success'
            });

            setTimeout(function () { window.location.reload(); }, 3500);

        }
    }


    return (
        <>

            {user.master ? <NavbarMaster /> : <NavbarLoged />}

            <Container>
                <Card className="titlePayments">
                    <Card.Body>Detalles de pago del local  {`${code} - ${state.name}`} <br/> {`Propietario: ${datoState.owner} ${datoState.ownerLast}`} <br/> {`Telefono: ${datoState.phone} `}</Card.Body>
                </Card>
                <Table className="margintable" striped bordered hover size="sm" >
                    <thead>
                        <tr className='first'>
                            <th>Fecha del pago    </th>
                            <th>Monto en dolares</th>
                            <th>Monto en bolivares</th>
                            <th>Referencia</th>
                            <th>Banco</th>
                            <th>Tasa de cambio</th>
                            <th>Pago en dolares</th>
                            <th>Descripcion</th>
                            <th>Por pagar</th>
                            <th>Registrado por</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos.map(data => (

                                <tr key={data.id}>
                                    <td><p>{data.date}</p> </td>
                                    <td>{numberWithCommas(parseFloat(-data.amountUSD))}</td>
                                    <td>{data.referenceNumber == null ? "   -  " : numberWithCommas(parseFloat(data.amountBS))}</td>
                                    <td>{data.referenceNumber == null ? "   -   " : data.referenceNumber}</td>
                                    <td>{data.referenceNumber == null ? "   -   " : data.bank}</td>
                                    <td>{data.referenceNumber == null ? "   -   " : numberWithCommas(parseFloat(data.exchangeRate))}</td>
                                    <td>{data.referenceNumber == null ? "   -   " : (data.paymentUSD === false ? 'No' : 'Si')}</td>
                                    <td><p> {data.description}  </p> </td>
                                    <td>{code == '0000' ? "   -   " : numberWithCommas(parseFloat(data.restanteUSD))}</td>
                                    <td>{data.admin.username}</td>
                                    {code === '0000' && data.referenceNumber != null ? <td><Button onClick={() => { handleShow(); editarSaldo(code, data.amountUSD, data.id) }} className="btn">Asignar</Button></td> : null}
                                    <td> <Button className="anular" onClick={() => deleteP(data)}>Anular</Button></td>

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Asignaci??n del pago registrado por  <b> {state.saldoEdit}$ </b> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        Local actual : <b>  {state.localEdit} </b>
                        <br />
                        <Form.Group className="formregistrar" controlId="formBasicEmail">
                            <Form.Label>Nuevo local: </Form.Label>
                            <Form.Control type="text" pattern="[0-9.]{0,13}" placeholder="Ingresar c??digo" name="upCode" onChange={onInputChange} />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" type="submit" onClick={upCode}>
                            Actualizar c??digo
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>

    )

}


export default PaymentsDetails


