import React, { useState, useContext } from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import swal from 'sweetalert';

// Components
import Navbar from './navbar.js';

// Style
import '../../assets/css/login.css';

// Images
import loginIcon from '../../assets/images/lagomall.jpeg'
import lagoMall from '../../assets/images/lagomallcc.jpg'
import axios from '../../config/axios';
import { AuthContext } from './AuthContext.js';
import { types } from '../../config/constant.js';


export const Login = ({history}) => {

    const defaultState = {
        username: '',
        password: ''
    }
    
    const [state, setState] = useState(defaultState);
    const {dispatch} = useContext(AuthContext);
    
    const onInputChange = (e) => {
    
        setState({ ...state, [e.target.name]: e.target.value });
    
    }
    
    
    const onSubmitForm = (e) => {

        e.preventDefault();

        if (state.username === '' || state.password === ``){
             
                swal({
                    title: 'Error',
                    text: 'Debe completar los campos',
                    icon: 'error'
                });
        } else {


            axios.post('/admin/login',
            {
                username: state.username,
                password: state.password,
            }).then(data => {
    
                if(data.data.ok === true){
    
                    dispatch({
                        type: types.login,
                        payload: {
                            name: data.data.usuario.username,
                            token: data.data.token,
                            master: data.data.usuario.id === 1 ? true : false
                        }
                    })
    
                    if(data.data.usuario.id === 1){
                        history.replace('/master');
    
                    } else{
                        history.replace('/admin');
    
                    }
    
                }else{
                    swal({
                        title: 'Error',
                        text: 'Usuario o contraseña incorrecto',
                        icon: 'error'
                    });
                    
                }
    
            })

        }


    
    }


    return (
        <>
            <Navbar />
            <Container className="mt-5" >
                <Row>
                    <Col xs={5} className="text-center mt-5">
                        <img className="icon-img" src={loginIcon} alt="icon" />
                        
                        <Form onSubmit={onSubmitForm}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Control type="text" placeholder="Enter username" name="username" onChange={onInputChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" name="password" onChange={onInputChange} />
                            </Form.Group>

                            <Button variant="primary btn-block" type="submit">Login</Button>

                        </Form>
                    </Col>

                    <Col xs={4} className="lgContainer">
                        <img className="lagomall" src={lagoMall} alt="" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
