import React, { useContext, useState } from "react"
import dayjs from "dayjs"

const TableContext = React.createContext()

export function useTable() {
	return useContext(TableContext)
}

export function TableProvider({ children }) {
	const currDate = new Date()
	const [tables, setTables] = useState([])
	const [showTables, setShowTables] = useState(false)
	const [bookedTables, setBookedTables] = useState(new Set()) //has table ids of all booked tables in a Set
	const [startTimeinMins, setStartTimeinMins] = useState(0)
	const [endTimeinMins, setEndTimeinMins] = useState(0)
	const [date, setDate] = useState(dayjs(currDate))
	const [startTime, setStartTime] = useState(dayjs(currDate))
	const [endTime, setEndTime] = useState(dayjs(currDate))

	return (
		<TableContext.Provider
			value={{
				tables,
				setTables,
				showTables,
				setShowTables,
				bookedTables,
				setBookedTables,
				startTimeinMins,
				setStartTimeinMins,
				endTimeinMins,
				setEndTimeinMins,
				date,
				setDate,
				startTime,
				setStartTime,
				endTime,
				setEndTime,
			}}
		>
			{children}
		</TableContext.Provider>
	)
}
