import React, { useState } from "react"
import dayjs from "dayjs"
import TextField from "@mui/material/TextField"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"

import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

//**********apis********
import { getAllTables, getBookedTables } from "../../apis/tableBookingAPIs"
//**********apis********

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
})

const convertToMinutes = (hms) => {
	var a = hms.split(":") // split it at the colons
	var totalMinutes = +a[0] * 60 + +a[1]
	return totalMinutes
}

const DateAndTime = ({
	setShowTables,
	tables,
	setTables,
	bookedTables,
	setBookedTables,
}) => {
	const [date, setDate] = useState(dayjs("2022-08-18T10:00:00"))
	const [startTime, setStartTime] = useState(dayjs("2014-08-18T11:00:00"))
	const [endTime, setEndTime] = useState(dayjs("2014-08-18T14:00:00"))

	const convertDateTime = () => {
		const dateFormatted = date.format("YYYY-MM-DD")
		const startMins = convertToMinutes(startTime.format("HH:mm:ss"))
		const endMins = convertToMinutes(endTime.format("HH:mm:ss"))

		return { dateFormatted, startMins, endMins }
	}

	const handleDateChange = (newValue) => {
		setDate(newValue)
	}

	const handlestartTimeChange = (newValue) => {
		setStartTime(newValue)
	}
	const handleEndTimeChange = (newValue) => {
		setEndTime(newValue)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const { dateFormatted, startMins, endMins } = convertDateTime()
			const fetchedTables = await getAllTables()
			const fetchedbookedTables = await getBookedTables(
				dateFormatted,
				startMins,
				endMins
			)
			if (fetchedbookedTables.found) {
				const bookedTablesSet = new Set(fetchedbookedTables.data)
				setBookedTables(bookedTablesSet)
			}
			setTables(fetchedTables.data.tables)
			setShowTables(true)
			console.log(bookedTables)
			console.log(tables)
		} catch (error) {
			console.error(error.response.data.message)
		}
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<div className='tableBook__container__form'>
					<div className='tableBook__container__form__date'>
						<MobileDatePicker
							label='Date mobile'
							inputFormat='YYYY/MM/DD'
							value={date}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</div>
					<div className='tableBook__container__form__starttime'>
						<TimePicker
							label='Start time'
							value={startTime}
							onChange={handlestartTimeChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</div>
					<div className='tableBook__container__form__endtime'>
						<TimePicker
							label='End time'
							value={endTime}
							onChange={handleEndTimeChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</div>
					<button
						onClick={handleSubmit}
						className='tableBook__container__form__btn'
					>
						Submit
					</button>
				</div>
			</LocalizationProvider>
		</ThemeProvider>
	)
}

export default DateAndTime
