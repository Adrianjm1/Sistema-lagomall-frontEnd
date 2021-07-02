
import axios from 'axios'


const client = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const generateToken = token => {
    if(token){
      client.defaults.headers.common['x-auth'] = token;
    } else {
      delete client.defaults.headers.common['x-auth'];
    }
  }


  export default client;