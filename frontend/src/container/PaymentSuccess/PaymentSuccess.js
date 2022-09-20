import React, { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { Navbar } from "../../components"
import "./PaymentSuccess.scss"

const PaymentSuccess = () => {
	const search = useLocation().search
	const session_id = new URLSearchParams(search).get("session_id")

	const [loading, setLoading] = useState(true)
	const [paymentStatus, setPaymentStatus] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`http://localhost:5000/api/payment?session_id=${session_id}`
			)
			if (response.data.success === true) {
				console.log("Payment Successful")
				setLoading(false)
				setPaymentStatus("Your payment was successful")
			} else {
				console.log("Payment Failed")
				setLoading(false)
				setPaymentStatus("Your payment failed")
			}
		}
		fetchData()
	}, [])

	return (
		<div>
			<div className='payment'>
				<div className='payment__container'>
					<div className='payment__container__header'>
						<h1 className='payment__container__header__title'>
							{loading
								? "Your transaction is being processed. Please wait."
								: paymentStatus}
						</h1>
						<p className='payment__container__header__subtitle'>Thank you</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PaymentSuccess