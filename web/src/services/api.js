import axios from 'axios'

const api = axios.create({
    baseURL: 'https://deev-box.herokuapp.com',
});

export default api;