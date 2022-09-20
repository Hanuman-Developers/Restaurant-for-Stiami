import React from "react"
import { Navbar } from "../../components"
import "./PaymentFail.scss"

const PaymentFail = () => {
	return (
		<div>
			<Navbar></Navbar>
			<div className='payment'>
				<div className='payment__container'>
					<div className='payment__container__header'>
						<h1 className='payment__container__header__title'>
							Payment unsuccessful
						</h1>
						<p className='payment__container__header__subtitle'>
							Please try again.
						</p>
					</div>
					<div className='payment__container__header__body'>
						<iframe
							className='payment__container__header__body__iframe'
							src='https://giphy.com/embed/VbnUQpnihPSIgIXuZv'
							width='384'
							height='480'
							frameBorder='0'
							class='giphy-embed'
							allowFullScreen
						></iframe>
						{/* <p>
							<a href='https://giphy.com/gifs/computer-cat-wearing-glasses-VbnUQpnihPSIgIXuZv'>
								via GIPHY
							</a>
						</p> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PaymentFail
