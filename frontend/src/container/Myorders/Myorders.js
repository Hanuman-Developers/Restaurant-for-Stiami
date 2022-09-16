import React from "react"
import MyOrderCard from "../../components/MyOrderComps/MyOrderCard"
import "./Myorders.scss"

const Myorders = () => {
	return (
		<div className='myorders'>
			<div className='myorders__container'>
				<h1 className='myorders__container__header'>My Orders</h1>

				<div className='myorders__container__cards'>
					<MyOrderCard />
				</div>
			</div>
		</div>
	)
}

export default Myorders
