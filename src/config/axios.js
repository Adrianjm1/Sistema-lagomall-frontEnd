
import axios from 'axios'

const client = axios.create({
  // baseURL: 'http://localhost:5000/api', //Local
  // baseURL: 'https://test-lagomall.herokuapp.com/api',   //Pre-Production
  baseURL: 'https://condominio-cc-lagomall-back.herokuapp.com/api',   //Production
});


export const generateToken = token => {
  if (token) {
    client.defaults.headers.common['token'] = token;
  } else {
    delete client.defaults.headers.common['token'];
  }
}


export default client;