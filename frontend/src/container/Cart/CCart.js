import React, { useEffect, useState } from "react"
import axios from "axios"
import MyOrderCard from "../../components/MyOrderComps/MyOrderCard"
import "./CCart.scss"
import { CartState } from "../../context/cartItem_context"

const MyCart = () => {
	const { cart, total, clearCart, amount, auth } = CartState()

	return (
		<div className='mycart'>
			<div className='mycart__container'>
				<h1 className='mycart__container__header'>My Orders</h1>
				<div className='mycart__container__cards' key={index}>
					<div className='mycart__container__cards__card'>
						<div className='mycart__container__cards__card__left'>
							<div className='mycart__container__cards__card__left__header'>
								<h1 className='mycart__container__cards__card__left__header__title'>
									Order: {orderItem.order._id}
								</h1>
								<p className='mycart__container__cards__card__left__header__date'>
									Date: {dayjs(orderItem.order.createdAt).format("DD MMM YYYY")}
								</p>
							</div>
							<div className='mycart__container__cards__card__left__items'>
								<h2 className='mycart__container__cards__card__left__items__title'>
									Items
								</h2>
								{orderItem.order.products.map((product, index) => (
									<div
										className='mycart__container__cards__card__left__items__item'
										key={index}
									>
										<div className='mycart__container__cards__card__left__items__item__name'>
											{orderItem.productDetails[index].prodName} x{" "}
											{product.quantity}
										</div>
										<div className='mycart__container__cards__card__left__items__item__price'>
											${" "}
											{orderItem.productDetails[index].prodPrice *
												product.quantity}
										</div>
									</div>
								))}
							</div>
							<div className='linee'>
								<hr />
							</div>
							<h2 className='mycart__container__cards__card__left__total'>
								Total: $ {orderItem.order.total / 100}
							</h2>
						</div>
						<div className='mycart__container__cards__card__right'>
							<div className='mycart__container__cards__card__right__header'>
								<h1 className='mycart__container__cards__card__right__header__title'>
									Status
								</h1>
							</div>
							<div className='mycart__container__cards__card__right__status'>
								<OrderStatus status={3} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyCart
