import React, { Component } from 'react'
import axios, { generateToken } from '../config/axios'
import {ListGroup } from "react-bootstrap";
import {TABLE_GET} from '../config/constant'


export default class GetLocales extends Component {



    state = {
        data: []
    }

    componentDidMount() {
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI1MzQ4NTYxLCJleHAiOjE2MjUzNjY1NjF9.GVbynWR0P-TPjBlUB-JEoD53SlnuDAVvkH-0OpZ9oFs')  // for all requests
  
        axios.get(TABLE_GET)
            .then((res) => {
                console.log(res.data)

                this.setState({ data: res.data[0].name })
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
                    <ListGroup.Item>{}</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </div>
        )
    }
}
