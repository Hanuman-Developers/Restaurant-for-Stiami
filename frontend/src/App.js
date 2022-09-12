import React from "react"

import {
	AboutUs,
	Chef,
	FindUs,
	Footer,
	Gallery,
	Header,
	Intro,
	Laurels,
} from "./container"
import { Navbar } from "./components"
import Cart from "./container/Cart/Cart"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import { useGlobalContext } from "./context/cartItem_context"
import Home from "./container/Home"
import Menu from "./container/Menu/Menu"
import TableBook from "./container/TableBook/TableBook"
import PaymentSuccess from "./container/PaymentSuccess/PaymentSuccess"
import PaymentFail from "./container/PaymentFail/PaymentFail"

const App = () => (
	<div>
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/cart' element={<Cart />} />
			<Route path='/menu' element={<Menu />} />
			<Route path='/tables' element={<TableBook />} />
			<Route path='/paymentSuccess' element={<PaymentSuccess />} />
			<Route path='/paymentFailed' element={<PaymentFail />} />
		</Routes>
	</div>
)

export default App
