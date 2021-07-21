import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios, { generateToken } from '../../config/axios'
import { useHistory, useParams, Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { AuthContext } from '../auth/AuthContext';
import { Table, Container, Button, Card } from "react-bootstrap";
import '../../assets/css/paymentsDetails.css';
import { NavbarLoged } from '../locales/NavbarLoged';
import { NavbarMaster } from '../locales/NavbarMaster';



const defaultState = {
    datos: [],
    name: '',
    code:''

}


function PaymentsDetails()  {

    const [state, setState] = useState(defaultState);

    const {user} = useContext(AuthContext);
    let code = useParams().code

    
    const datos = useMemo(function () {
        return state.datos
    }, [state])

    useEffect(function () {



        generateToken(user.token)  // for all requests
        axios.get(`/payments/${code}`)
            .then((res) => {
                // console.log(res.data);
                setState({...state, datos: res.data, code: code, name: res.data[0].locale.name  })

                // console.log(res.data[0].locale.code);

                // console.log(res.data);

            })
            .catch((error) =>
                console.log(error)
            )



        //eslint-disable-next-line
    }, [])


        return (
            <>

                {user.master ? <NavbarMaster/> : <NavbarLoged/>}

                <Container>
                    <Card className="titlePayments">
                        <Card.Body>Detalles de pago del local  {`${code} - ${state.name} `}</Card.Body>
                    </Card>
                    <Table className="margintable" striped bordered hover size="sm" >
                        <thead>
                            <tr className='first'>
                                <th>Fecha</th>
                                <th>Monto en dolares</th>
                                <th>Monto en bolivares</th>
                                <th>Referencia</th>
                                <th>Banco</th>
                                <th>Tasa de cambio</th>
                                <th>Pago en dolares</th>
                                <th>Registrado por</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datos.map(data => (
                                    <tr key={data.id}>
                                        <td>{data.createdAt.slice(0, 10)}</td>
                                        <td>{data.amountUSD}</td>
                                        <td>{parseFloat(data.amountBS)}</td>
                                        <td>{data.referenceNumber}</td>
                                        <td>{data.bank}</td>
                                        <td>{data.exchangeRate}</td>
                                        <td>{data.paymentUSD == false ? 'No' : 'Si'}</td>
                                        <td>{data.admin.username}</td>
                                        {/* <td><Link className="btn"><Button className="see">Editar</Button></Link></td> */}

                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>
            </>

        )
    
}


export default PaymentsDetails


