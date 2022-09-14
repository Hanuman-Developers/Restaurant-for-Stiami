import React, { useState } from "react"
import { useTable } from "../../context/TableContext"
import "./Table.scss"
import { images } from "../../constants"

const Table = ({ capacity, number, tableid }) => {
	const { bookedTables, startTimeinMins, endTimeinMins, date } = useTable()

	const [product, setproduct] = useState({
		name: `Table number ${number}`,
		tableid: tableid,
		startTimeinMins: startTimeinMins,
		endTimeinMins: endTimeinMins,
		date: date.format("YYYY-MM-DD"),
		email: "vivek@gmail.com",
	})

	const makePayment = async () => {
		const body = {
			product: product,
		}

		fetch("http://localhost:5000/api/payment/tables", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (res.ok) return res.json()
				return res.json().then((json) => Promise.reject(json))
			})
			.then(({ url }) => {
				window.location = url
			})
			.catch((error) => {
				console.log(error)
				alert(error.message)
			})
	}

	return (
		<>
			<div className='tableBook__container__tables__table'>
				<div className='tableBook__container__tables__table__header'>
					Table {number}
				</div>
				{capacity === 4 ? (
					<div className='tableBook__container__tables__table__body--2'>
						<img
							className='tableBook__container__tables__table__body--2__img'
							src={images.fourseat}
							alt=''
						/>
					</div>
				) : (
					<div className='tableBook__container__tables__table__body'>
						<img
							className='tableBook__container__tables__table__body__img'
							src={images.twoseat}
							alt=''
						/>
					</div>
				)}
				<div className='tableBook__container__tables__table__footer'>
					{bookedTables.has(tableid) ? (
						<button
							onClick={() =>
								alert("This table is booked for this date and time slot.")
							}
							className='tableBook__container__tables__table__footer__btn'
						>
							Booked
						</button>
					) : (
						<>
							<button
								onClick={makePayment}
								className='tableBook__container__tables__table__footer__btn'
							>
								Book now
							</button>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default Table
