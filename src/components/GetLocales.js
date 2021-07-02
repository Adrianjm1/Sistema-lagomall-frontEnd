import React, { Component } from 'react'
import axios, {generateToken} from '../config/axios'


export default class GetLocales extends Component {



    componentDidMount() {
        
        generateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjo0LCJ1c2VybmFtZSI6ImNyNyIsInBhc3N3b3JkIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA2LTI0VDE2OjIzOjA4LjAwMFoifSwiaWF0IjoxNjI1MjQ5Mzg1LCJleHAiOjE2MjUyNjczODV9.FnWavwXN2AnsbNiBmelhNJIs97QFIYfUno8lHY9MS7k' )  // for all requests

        axios.get('/admin/')
            .then((res)=>console.log(res.data))
            .catch( (error)=>
                console.log(error)
            )
            
    }

    render() {
        return (
            <div>
                Todos los locales
            </div>
        )
    }
}
