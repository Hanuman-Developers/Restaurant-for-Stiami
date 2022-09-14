import React from "react"
import Cart from "./container/Cart/Cart"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./container/Home"
import Menu from "./container/Menu/Menu"
import TableBook from "./container/TableBook/TableBook"
import PaymentSuccess from "./container/PaymentSuccess/PaymentSuccess"
import PaymentFail from "./container/PaymentFail/PaymentFail"
import { TableProvider } from "./context/TableContext"
import "./App.css"

const App = () => (
	<div>
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/cart' element={<Cart />} />
			<Route path='/menu' element={<Menu />} />
			<Route
				path='/tables'
				element={
					<TableProvider>
						<TableBook />
					</TableProvider>
				}
			/>
			<Route path='/paymentSuccess' element={<PaymentSuccess />} />
			<Route path='/paymentFailed' element={<PaymentFail />} />
		</Routes>
	</div>
)

export default App
