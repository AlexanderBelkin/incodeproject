import axios from 'axios';
// baseURL: 'http://192.168.88.97:5000/api/', For mobile testing
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

export default instance;
