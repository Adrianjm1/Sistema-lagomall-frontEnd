
import axios from 'axios'
import { URL_API } from './constant';


const client = axios.create({
    baseURL: URL_API,
});


export const generateToken = token => {
    if(token){
      client.defaults.headers.common['token'] = token;
    } else {
      delete client.defaults.headers.common['token'];
    }
  }


  export default client;