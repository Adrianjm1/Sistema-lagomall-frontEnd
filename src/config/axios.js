
import axios from 'axios'


const client = axios.create({
    baseURL: 'http://localhost:5000/api',
});


// client.interceptors.request.use(
//   function(config) {
//     const token = localStorage.getItem("token"); 
//     if (token) {
//       config.headers["Authorization"] = 'Bearer ' + token;
//     }
//     return config;
//   },
//   function(error) {
//     return Promise.reject(error);
//   }
// );


export const generateToken = token => {
    if(token){
      console.log(token);
      client.defaults.headers.common['x-auth'] = token;
    } else {
      delete client.defaults.headers.common['x-auth'];
    }
  }


  export default client;