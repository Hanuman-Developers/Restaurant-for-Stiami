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
import { io } from "socket.io-client"
import AllOrders from "./container/AllOrders/AllOrders"
import Myorders from "./container/Myorders/Myorders"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
const socket = io("http://localhost:5000")

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
})
socket.on("connect", () => {
	console.log(`${socket.id}`)
})

const App = () => {
	const { auth, setAuth } = CartState()

	useEffect(() => {
		const getUser = () => {
			fetch("http://localhost:5000/api/auth/login/success", {
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
					if (resObject.user.email === undefined) {
						setAuth("")
					} else {
						setAuth(resObject.user.email)
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
			<div>
				{/* <VerticalNavbar /> */}

				<Routes>
					<Route path='/' element={<Layout_ />}>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route element={<RequireAuth />}></Route>
						<Route path='/menu' element={<Menu />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/ordersuccess' element={<OrderSuccess />} />
						<Route path='/allorders' element={<AllOrders />} />
						<Route path='/my-orders' element={<Myorders />} />
					</Route>
					<Route path='/calendar' element={<Calendar />} />
					<Route path='/additem' element={<AddFoodItem />} />
					<Route path='/additem' element={<AddFoodItem />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/orderdashboard' element={<AdminOrderDashboard />} />

					<Route path='/product' element={<Product />} />
					<Route path='/edit/:title' element={<EditFoodItem />} />
				</Routes>
			</div>
		</ThemeProvider>
	)
}

export { App, socket }
