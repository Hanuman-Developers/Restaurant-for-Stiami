import axios from "axios"

const fetchUrl =
	process.env.REACT_APP_NODE_ENV === "development"
		? "http://localhost:5000/api/"
		: "/api"

const BASE_URL = "/api/"

export default axios.create({
	baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
})
