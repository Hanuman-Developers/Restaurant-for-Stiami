import React, {
	useState,
	useContext,
	useReducer,
	useEffect,
	useRef,
} from "react"
import { data } from "../constants"
import { cartReducer } from "./reducer"
//import reducer from "./reducer";
import axios from "../apis/axios"
const url = "products/"
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, {
		// loading: false,
		cart: data.wines,
		total: 0,
		amount: 0,
	})

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" })
	}
	const remove = (id) => {
		dispatch({ type: "REMOVE", payload: id })
	}
	const increase = (id) => {
		dispatch({ type: "INCREASE", payload: id })
		console.log(state)
	}
	const decrease = (id) => {
		dispatch({ type: "DECREASE", payload: id })
	}
	const fetchData = async () => {
		dispatch({ type: "LOADING" })
		const product = await axios.get(url, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		})
		const cart = product.data
		console.log(cart)
		dispatch({ type: "DISPLAY_ITEMS", payload: cart })
	}
	const toggleAmount = (id, type) => {
		console.log("Increase")
		console.log(id)

		dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } })
	}
	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		dispatch({ type: "GET_TOTALS" })
		console.log(state.total)
	}, [state.cart])

	/* Vertical NavBar */

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openSidebar = () => {
		setIsSidebarOpen(true)
	}
	const closeSidebar = () => {
		setIsSidebarOpen(false)
	}

	const openModal = () => {
		setIsModalOpen(true)
	}
	const closeModal = () => {
		setIsModalOpen(false)
	}

	/* Authorization */
	const [auth, setAuth] = useState({})

	const addressLine1 = useRef("")
	const addressLine2 = useRef("")
	const pincode = useRef("")

	return (
		<AppContext.Provider
			value={{
				...state,
				clearCart,
				remove,
				increase,
				decrease,
				toggleAmount,

				/*Vertical NavBar */

				isSidebarOpen,
				isModalOpen,
				openModal,
				closeModal,
				openSidebar,
				closeSidebar,

				/* Authorization */
				auth,
				setAuth,
				addressLine1,
				addressLine2,
				pincode,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

// make sure use
export const CartState = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
