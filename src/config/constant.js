// CONSTANTES A EXPOTAR PARA HACER EL CODIGO AMS LEGIBLE


const ADMIN_GET = '/admin';

const TABLE_GET = '/local/table';

const types = {
    login: '[auth] login',
    logout: '[auth] logout',
}

/* let api;

if (process.env.NODE_ENV != 'production') {
    api = 'http://localhost:5000/api';

} else {
    api = 'https://test-lagomall.herokuapp.com/api'

}
 */
const URL_API = 'https://test-lagomall.herokuapp.com/api';


export {
    TABLE_GET,
    ADMIN_GET,
    types,
    URL_API,
}
