import axios from "axios"

const getAllTables = async () => {
	const res = await axios.get("/api/tables")
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
		const res = await axios.get("/api/bookings/available", { params })
		return res.data
	} catch (error) {
		const errMsg = error.response.data
		return errMsg
	}
}

// const bookMyTable = (tableid, dateFormatted, startMins, endMins) => {

export { getAllTables, getBookedTables }
