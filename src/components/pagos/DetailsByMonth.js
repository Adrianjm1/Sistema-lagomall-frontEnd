import React, { useState, useEffect, useMemo, useContext } from 'react'
import axios, { generateToken } from '../../config/axios'
import { useHistory, useParams, Link } from 'react-router-dom';
import { useParams, withRouter } from "react-router";
import { AuthContext } from '../auth/AuthContext';
import { Table, Container, Button, Card } from "react-bootstrap";
import numberWithCommas from '../../helpers/helpers';
import '../../assets/css/paymentsDetails.css';
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';


const defaultState = {
    datos: [],
    name: '',
    mes: '',
    code: ''
}

function PaymentsDetails() {

    const [state, setState] = useState(defaultState);

    const {user} = useContext(AuthContext);


    let code = useParams().code


    
    useEffect(function () {



        generateToken(user.token)  // for all requests
        axios.get(`/payments/${code}`)
            .then((res) => {
                // console.log(res.data);
                setState({...state, datos: res.data, code: code  })
                setState({ ...state ,name: res.data[0].locale.name })
                // console.log(res.data[0].locale.code);
                
                console.log(state.datos);

            })
            .catch((error) =>
                console.log(error)
            )


        //eslint-disable-next-line
    }, [])


        return (

            <Container>

                 <Card className="titlePayments">
                    <Card.Body>Detalles de pago del local  {  `${state.code} - ${state.name} `   }</Card.Body>
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
                            state.datos.map(data => (
                                <tr key={data.id}>
                                    <td>{data.createdAt.slice(0, 10)}</td>
                                    <td>{numberWithCommas(data.amountUSD)}</td>
                                    <td>{numberWithCommas(data.amountBS)}</td>
                                    <td>{data.referenceNumber}</td>
                                    <td>{data.bank}</td>
                                    <td>{numberWithCommas(data.exchangeRate)}</td>
                                    <td>{data.paymentUSD == false ? 'No' : 'Si'}</td>
                                    <td>{data.admin.username}</td>
                                    {/* <td><Link className="btn"><Button className="see">Editar</Button></Link></td> */}

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>

        )
    
}


export default PaymentsDetails


