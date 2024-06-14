import axios from "axios";

export const instants = axios.create({
    baseURL : "http://localhost:3090/api/"
})