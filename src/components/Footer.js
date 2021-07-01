import React, { Component } from 'react'
import { Card, Button, Row } from "react-bootstrap";
import '../assets/css/footer.css'


export default class Footer extends Component {
    
    render() {
        return (
            <div>
                <Card className='sty'>
                <Card.Body   className='footer-c'> © Centro comercial Lago Mall. Todos los derechos reservados</Card.Body>
                </Card>
            </div>
        )
    }
}
