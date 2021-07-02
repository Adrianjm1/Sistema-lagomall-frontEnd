import React, { Component } from 'react'
import axios, { generateToken } from '../config/axios'
import {ListGroup } from "react-bootstrap";


export default class GetLocales extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI1MjQ5Mzg1LCJleHAiOjE2MjUyNjczODV9.FnWavwXN2AnsbNiBmelhNJIs97QFIYfUno8lHY9MS7k')  // for all requests


        axios.get('/admin/')
            .then((res) => {
                console.log(res.data)


                this.setState({ data: res.data.username })
            })
            .catch((error) =>
                console.log(error)
            )


    }


    render() {
        return (
            <div>
                Todos los locales
                <p>{this.state.data}</p>


                <ListGroup>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </div>
        )
    }
}
