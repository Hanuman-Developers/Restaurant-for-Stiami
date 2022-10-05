import React from "react";
import dayjs from "dayjs";
import OrderStatus from "./OrderStatus";

const MyOrderCard = ({ orderItem }) => {
  return (
    <div className="myorders__container__cards__card">
      <div className="myorders__container__cards__card__left">
        <div className="myorders__container__cards__card__left__header">
          <h1 className="myorders__container__cards__card__left__header__title">
            Order: {orderItem.order._id}
          </h1>
          <p className="myorders__container__cards__card__left__header__date">
            Date: {dayjs(orderItem.order.createdAt).format("DD MMM YYYY")}
          </p>
        </div>
        <div className="myorders__container__cards__card__left__items">
          <h2 className="myorders__container__cards__card__left__items__title">
            Items
          </h2>
          {orderItem.order.products.map((product, index) => (
            <div
              className="myorders__container__cards__card__left__items__item"
              key={index}
            >
              <div className="myorders__container__cards__card__left__items__item__name">
                {orderItem.productDetails[index].prodName} x {product.quantity}
              </div>
              <div className="myorders__container__cards__card__left__items__item__price">
                $ {orderItem.productDetails[index].prodPrice * product.quantity}
              </div>
            </div>
          ))}
        </div>
        <div className="linee">
          <hr />
        </div>
        <h2 className="myorders__container__cards__card__left__total">
          Total: $ {orderItem.order.total / 100}
        </h2>
      </div>
      <div className="myorders__container__cards__card__right">
        <div className="myorders__container__cards__card__right__header">
          <h1 className="myorders__container__cards__card__right__header__title">
            Status
          </h1>
        </div>
        <div className="myorders__container__cards__card__right__status">
          <OrderStatus status={orderItem.order.delivery_status} />
        </div>
      </div>
    </div>
  );
};

export default MyOrderCard;
