import React, { useEffect } from "react"

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
import { Navigate } from "react-router-dom"
import { CartState } from "./context/cartItem_context"
import Home from "./container/Home"
import Menu from "./container/Menu/Menu"
import Calendar from "./components/Calendar/Calendar"
import VerticalNavbar from "./components/VerticalNavbar/VerticalNavbar"
import AddFoodItem from "./container/AddFoodItem/AddFoodItem"
import Product from "./container/Product/Product"
import EditFoodItem from "./container/EditFoodItem/EditFoodItem"
import Login from "./container/Login/Login"
import RequireAuth from "./utils/requireAuth"
import Layout_ from "./container/Layout"
import Dashboard from "./container/Dashboard/Dashboard"
import OrderSuccess from "./container/Order/Success/OrderSuccess"
import AdminOrderDashboard from "./container/AdminOrderDashboard/AdminOrderDashboard"
import AllOrders from "./container/AllOrders/AllOrders"
import Inventory from "./container/Inventory/Inventory"
import TableBook from "./container/TableBook/TableBook"
import PaymentSuccess from "./container/PaymentSuccess/PaymentSuccess"
import PaymentFail from "./container/PaymentFail/PaymentFail"
import Myorders from "./container/Myorders/Myorders"
import { TableProvider } from "./context/TableContext"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
})

const ROLES = {
	User: 2001,
	// 'Editor': 1984,
	Admin: 1990,
}

const App = () => {
	const { auth, setAuth } = CartState()

	useEffect(() => {
		const getUser = () => {
			fetch("http://stiamivip.com/api/auth/login/success", {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": true,
				},
			})
				.then((response) => {
					if (response.status === 200) return response.json()
					throw new Error("authentication has been failed!")
				})
				.then((resObject) => {
					console.log(resObject.user)
					localStorage.setItem("auth", JSON.stringify(resObject.user.roles))

					if (resObject.user.email === undefined) {
						setAuth("")
					} else {
						const email = resObject.user.email
						const roles = resObject.user.roles
						setAuth({
							email,
							roles,
						})
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
		getUser()
	}, [])

	return (
		<ThemeProvider theme={darkTheme}>
			{/* <VerticalNavbar /> */}

			<Routes>
				<Route path='/' element={<Layout_ />}>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/menu' element={<Menu />} />

					<Route element={<RequireAuth allowedRoles={ROLES.User} />}>
						<Route path='/cart' element={<Cart />} />
						<Route path='/ordersuccess' element={<OrderSuccess />} />
						<Route path='/allorders' element={<AllOrders />} />
						<Route path='/my-orders' element={<Myorders />} />
						<Route path='/paymentSuccess' element={<PaymentSuccess />} />
						<Route path='/paymentFailed' element={<PaymentFail />} />
					</Route>
				</Route>

				<Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/calendar' element={<Calendar />} />
					<Route path='/additem' element={<AddFoodItem />} />
					<Route path='/orderdashboard' element={<AdminOrderDashboard />} />
					<Route path='/inventory' element={<Inventory />} />
					<Route path='/edit/:id' element={<EditFoodItem />} />
					<Route path='/product' element={<Product />} />
				</Route>

				<Route
					path='/tables'
					element={
						<TableProvider>
							<TableBook />
						</TableProvider>
					}
				/>
			</Routes>
		</ThemeProvider>
	)
}

export { App }
