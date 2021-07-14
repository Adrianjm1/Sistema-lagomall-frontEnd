import React, { Component } from 'react'
import axios, { generateToken } from '../config/axios'
import { Link } from 'react-router-dom';
import Picker from 'react-month-picker'
import MonthPicker from './MonthPicker';
import { Table, Container, Button, Form, FormControl, Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";
import '../assets/css/locales.css';


export default class GetLocales extends Component {


    constructor() {
        super();
        this.state = {
            name: 'React',
            datos: [],
            busqueda: '',
            locales: []
        };
    }

    onChange = async e => {
        e.persist();
        await this.setState({ busqueda: e.target.value.toUpperCase() });
        this.filter();
    }


    filter = () => {

        let search = this.state.datos.filter(local => {
            if (local.code.includes(this.state.busqueda))
                return local;
        })

        this.setState({ locales: search })
    }


    componentDidMount() {
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI2MjE0NjA4LCJleHAiOjE2MjYyMzI2MDh9.2AmacbsJCR81sZaq-HPQGf4wMNYSoec0HtUEtHgS1Xk')  // for all requests

        axios.get('/local/table')
            .then((res) => {
                this.setState({ datos: res.data });
                this.setState({ locales: res.data });

            })
            .catch((error) =>
                console.log(error)
            )
    }

    render() {

        return (

            
            <Container>
                <div>
                    <MonthPicker name={this.state.name} />
                    
                </div>


                <Form inline>
                    <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" onChange={this.onChange} />
                    <Button className="btnSearch" >Buscar</Button>
                </Form>

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
                            this.state.locales.map(data => (
                                <tr key={data.code}>
                                    <td>{data.code.toUpperCase()}</td>
                                    <td>{`${data.owner.firstName} ${data.owner.lastName}`}</td>
                                    <td>{data.percentageOfCC}</td>
                                    <td>{data.monthlyUSD}</td>
                                    <td>{data.balance}</td>
                                    <td className="detalles" ><Link className="btn" to={`/admin/payments/${data.code}`}><Button className="see">Ver detalles</Button></Link></td>
                                </tr>
                            ))



                        }
                    </tbody>

                </Table>
            </Container>


        )
    }
}


