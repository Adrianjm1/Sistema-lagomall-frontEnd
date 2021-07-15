import React, { useState, useEffect, useMemo } from 'react'
import axios, { generateToken } from '../../config/axios'
import { Link } from 'react-router-dom';
import NavbarLoged from './NavbarMaster';
import LagoMallData from '../lagomallData/LagoMallData';
import { Table, Container, Button, Form, FormControl } from "react-bootstrap";
import '../../assets/css/locales.css';


const defaultState = {
    name: 'React',
    busqueda: '',
    locales: []
};


function GetLocalesMaster() {
    const [state, setState] = useState(defaultState);

    const locales = useMemo(function () {
        if (state.busqueda.length) {
            return state.locales.filter(local => local.code.includes(state.busqueda))
        }

        return state.locales
    }, [state])

    useEffect(function () {
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI2MjE0NjA4LCJleHAiOjE2MjYyMzI2MDh9.2AmacbsJCR81sZaq-HPQGf4wMNYSoec0HtUEtHgS1Xk')
        axios.get('/local/table')
            .then((res) =>
                setState({
                    ...state,
                    locales: res.data.map(
                        item => ({ ...item, code: item.code.toUpperCase() }) // Todos los code a uppercase una sola vez
                    )
                })
            )
            .catch((error) => console.log(error))

        //eslint-disable-next-line
    }, [])

    const handleChange = e => {
        setState({ ...state, busqueda: e.target.value.toUpperCase() });
    }

    return (
        <Container>
            <NavbarLoged />
            <LagoMallData />
            <div>
                <MonthPicker name={state.name} />
            </div>

            <Form inline>
                <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" onChange={handleChange} />
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
                        locales.map(data => (
                            <tr key={data.code}>
                                <td>{data.code}</td>
                                <td>{`${data.owner.firstName} ${data.owner.lastName}`}</td>
                                <td>{data.percentageOfCC}</td>
                                <td>{data.monthlyUSD}</td>
                                <td>{data.balance}</td>

                                <td><Link className="btn" to={`/master/payments/${data.code}`}><Button className="see">Ver detalles</Button></Link>
                                    <Link className="btn"><Button className="see">Editar saldo</Button></Link></td>
                                <td></td>
                            </tr>
                        ))
                    }
                </tbody>

            </Table>
        </Container>
    )
}

export default GetLocalesMaster;



