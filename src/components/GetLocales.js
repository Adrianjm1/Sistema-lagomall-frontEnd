import React, { Component } from 'react'
import axios, { generateToken } from '../config/axios'
import { Link } from 'react-router-dom';
import { Table, Container, Button } from "react-bootstrap";
import '../assets/css/locales.css';


export default class GetLocales extends Component {


    // changeRoute = ()=>{

    //     const history = useHistory();

    //     const handleHistory = ()=>{
    //         history.push(`/${code}`)
    //     }
    // }



    state = {
        datos: []
    }

    componentDidMount() {
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI1NTIwODgwLCJleHAiOjE2MjU1Mzg4ODB9._Y13mDCko3G5T7N0yq9ooeziCR3Ku65fh1yFvdHbh84')  // for all requests

        axios.get('/local/table')
            .then((res) => {
                this.setState({ datos: res.data })

            })
            .catch((error) =>
                console.log(error)
            )
    }

    render() {
        return (



            <Container>

                <Table striped bordered hover size="sm">
                    <thead>

                        <tr className='first'>
                            <th>Locales</th>
                            <th>Propietarios</th>
                            <th>% Según documento de condominio</th>
                            <th>Cuota total en $</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.datos.map(data => (
                                <tr key={data.code}>
                                    <td>{data.code}</td>
                                    <td>{`${data.owner.firstName} ${data.owner.lastName}`}</td>
                                    <td>{data.percentageOfCC}</td>
                                    <td>{data.monthlyUSD}</td>
                                    <td>{data.balance}</td>
                                    <td><Link className="btn"to={`/payments/${data.code}`}><Button className="see">Ver detalles</Button></Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>


        )
    }
}
