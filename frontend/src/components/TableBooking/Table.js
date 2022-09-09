import React, { useState } from "react"
// pk_test_51Lg3dwKkKO8NA6ZZUmzeOWZGwxPxMRM1lMuGIMzQmjpIpMpBihzh0KdeZ7KqeuGAEwhLmxd6KIhGw32sz3sC7OiV00PJaxXNCJ
import CheckoutForm from "./CheckoutForm"
import "./Table.scss"
import Alert from "@mui/material/Alert"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { images } from "../../constants"
import axios from "axios"

const Table = ({ capacity, number, bookedTables, tableid }) => {

	const [product, setproduct] = useState({
		name: `Table number ${number}`,
		tableid: tableid,
	})

	const makePayment = async () => {
		const body = {
			product: product,
			tableid: tableid,
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
