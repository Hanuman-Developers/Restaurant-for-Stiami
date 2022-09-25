import axios from "axios"

const fetchUrl =
	process.env.REACT_APP_NODE_ENV === "development"
		? "http://localhost:5000/api"
		: "/api"

const getAllTables = async () => {
	const res = await axios.get(`${fetchUrl}/tables`)
	return res
}

const getBookedTables = async (dateFormatted, startMins, endMins) => {
	console.log(dateFormatted, startMins, endMins)
	const params = {
		date: dateFormatted,
		slotStart: startMins,
		slotEnd: endMins,
	}

	try {
		const res = await axios.get(`${fetchUrl}/bookings/available`, { params })
		return res.data
	} catch (error) {
		const errMsg = error.response.data
		return errMsg
	}
}

// const bookMyTable = (tableid, dateFormatted, startMins, endMins) => {

export { getAllTables, getBookedTables }
