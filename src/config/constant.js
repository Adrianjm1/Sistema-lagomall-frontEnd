// CONSTANTES A EXPOTAR PARA HACER EL CODIGO AMS LEGIBLE


const ADMIN_GET = '/admin';

const TABLE_GET = '/local/table';

const types = {
    login: '[auth] login',
    logout: '[auth] logout',
}

const URL_API = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : 'https://test-lagomall.herokuapp.com/api';

/* if(process.env.NODE_ENV == 'development'){
    URL_API = 'http://localhost:5000/api';

} else{
    URL_API = 'https://test-lagomall.herokuapp.com/api'

} */


export  {      
    TABLE_GET,
    ADMIN_GET,
    types,
    URL_API,
} 
