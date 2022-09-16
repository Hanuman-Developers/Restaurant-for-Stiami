export const cartReducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      console.log(cartItem.amount);

      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    console.log(state.cart);
    console.log("INSIDE GET TOTTALS");

    let { total, category, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount, category } = cartItem;
        console.log(price);
        console.log(category);

        const itemTotal = cartItem.price * cartItem.amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += cartItem.amount;
        // console.log(cartTotal.amount);

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === "TOGGLE_AMOUNT") {
    console.log("ïnside toggle");

    let tempCart = state.cart.map((cartItem) => {
      console.log(cartItem._id);
      console.log(action.payload.id);
      if (cartItem._id === action.payload.id) {
        if (action.payload.type === "inc") {
          console.log("amount");

          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        if (action.payload.type === "dec") {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
      }
      return cartItem;
    });
    // .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  throw new Error("no matching action type");
};
