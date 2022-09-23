import axios from "axios"
const BASE_URL = "http://3.86.178.228:5000/api"

export default axios.create({
	baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
})
