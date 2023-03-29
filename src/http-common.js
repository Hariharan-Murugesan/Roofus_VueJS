import axios from "axios";

export default axios.create({
    baseURL: 'https://9d80-14-98-32-198.ngrok.io/',
    headers: {
        'Content-Type': 'application/json',
    },
})