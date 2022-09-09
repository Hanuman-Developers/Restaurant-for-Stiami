import React from "react"
import { Navbar } from "../../components"
import "./PaymentSuccess.scss"

const PaymentSuccess = () => {
	return (
		<div>
			<Navbar></Navbar>
			<div className='payment'>
				<div className='payment__container'>
					<div className='payment__container__header'>
						<h1 className='payment__container__header__title'>
							Payment successful
						</h1>
						<p className='payment__container__header__subtitle'>Thank you</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PaymentSuccess
