import React from "react"
import OrderStatus from "./OrderStatus"

const MyOrderCard = () => {
	return (
		<div className='myorders__container__cards__card'>
			<div className='myorders__container__cards__card__left'>
				<div className='myorders__container__cards__card__left__header'>
					<h1 className='myorders__container__cards__card__left__header__title'>
						Order: #Ab132432b
					</h1>
					<p className='myorders__container__cards__card__left__header__date'>
						Date: 12/12/2021
					</p>
				</div>
				<div className='myorders__container__cards__card__left__items'>
					<h2 className='myorders__container__cards__card__left__items__title'>
						Items
					</h2>
					<div className='myorders__container__cards__card__left__items__item'>
						<div className='myorders__container__cards__card__left__items__item__name'>
							Item Name
						</div>
						<div className='myorders__container__cards__card__left__items__item__price'>
							Item price
						</div>
					</div>
					<div className='myorders__container__cards__card__left__items__item'>
						<div className='myorders__container__cards__card__left__items__item__name'>
							Item Name
						</div>
						<div className='myorders__container__cards__card__left__items__item__price'>
							Item price
						</div>
					</div>
					<div className='myorders__container__cards__card__left__items__item'>
						<div className='myorders__container__cards__card__left__items__item__name'>
							Item Name
						</div>
						<div className='myorders__container__cards__card__left__items__item__price'>
							Item price
						</div>
					</div>
				</div>
				<div className='linee'>
					<hr />
				</div>
				<h2 className='myorders__container__cards__card__left__total'>
					Total: $60
				</h2>
			</div>
			<div className='myorders__container__cards__card__right'>
				<div className='myorders__container__cards__card__right__header'>
					<h1 className='myorders__container__cards__card__right__header__title'>
						Status
					</h1>
				</div>
				<div className='myorders__container__cards__card__right__status'>
					<OrderStatus />
				</div>
			</div>
		</div>
	)
}

export default MyOrderCard
