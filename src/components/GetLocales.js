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
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFuZHJlc2d1YW5pcGEiLCJwYXNzd29yZCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMS0wNi0yNlQwMDo1MjoyNi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNi0yNlQwMDo1MjoyNi4wMDBaIn0sImlhdCI6MTYyNTQxNjYxNCwiZXhwIjoxNjI1NDM0NjE0fQ.e5nMO-Y1PoOu4AlhX59ZqWSm-lXxpZDIo7izNZK9My0')  // for all requests

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

                <br></br>
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
                                    <td className="btn"><Link to={`/payments/${data.code}`}> <Button className="see">Ver detalles</Button></Link></td>

                                </tr>

                            ))

                        }
                    </tbody>
                </Table>
            </Container>


        )
    }
}
