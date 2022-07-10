import axios from "axios";


const storeApi = axios.create({
    baseURL: '/api'
})

export default storeApi