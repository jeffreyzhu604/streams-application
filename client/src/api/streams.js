import axios from 'axios';

// Where the Express server is hosted
export default axios.create({
    baseURL: 'http://localhost:8000'
});