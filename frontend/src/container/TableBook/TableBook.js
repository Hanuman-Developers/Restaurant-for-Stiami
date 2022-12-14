import React, { useContext } from "react"
import { TableContext } from "../../context/TableContext"
import { useState } from "react"
import { Navbar, Table, DateAndTime } from "../../components"
import { useTable, TableProvider } from "../../context/TableContext"

import "./TableBook.scss"

const TableBook = () => {
	const tabless = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

	const {
		tables,
		setTables,
		showTables,
		setShowTables,
		bookedTables,
		setBookedTables,
	} = useTable()

	return (
		<>
			<Navbar />
			<div className='tableBook'>
				<div className='tableBook__container'>
					<div className='tableBook__container__header'>
						<h1 className='tableBook__container__header__title'>
							Book your Table
						</h1>
						<p className='tableBook__container__header__subtitle'>
							Select your date and time. We are open 24 hours.
						</p>
					</div>
					<DateAndTime />
					<div className='tableBook__container__tables'>
						{showTables && tables.length > 0 ? (
							tables.map((table, index) => (
								<Table
									capacity={table.capacity}
									number={table.number}
									tableid={table._id}
									key={index}
								/>
							))
						) : (
							<h1 className='tableBook__container__tables__noTables'>🥘🥂🍨</h1>
						)}
						{/* {tables.length > 0 &&
							tables.map((table, index) => (
								<Table capacity={table.capacity} key={index} />
							))} */}
					</div>
				</div>
			</div>
		</>
	)
}

export default TableBook
