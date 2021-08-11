import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import '../assets/css/footer.css'


export default class Footer extends Component {
    
    render() {
        return (
            <div>
                <Card className='sty'>
                <Card.Body   className='footer-c'><b>© Centro Comercial Lago Mall. Todos los derechos reservados.</b></Card.Body>
                </Card>
            </div>
        )
    }
}
