import * as React from "react"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import { ListItem } from "@mui/material"
import { CartState } from "../../context/cartItem_context"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import axios from "axios"

export default function AddressDrawer() {
	const { cart, addressLine1, addressLine2, pincode } = CartState()

	const handleAddressForm = async () => {
		if (
			addressLine1.current.value === "" ||
			addressLine2.current.value === "" ||
			pincode.current.value === ""
		) {
			alert("Please fill all the fields")
			return
		}
		console.log(
			addressLine1.current.value,
			addressLine2.current.value,
			pincode.current.value
		)

		const result = cart.filter((item) => item.amount > 0)
		// console.log(result)

		const cartItems = []
		result.map((item) => {
			cartItems.push({
				product: item._id,
				quantity: item.amount,
			})
		})
		console.log(cartItems)

		const body = {
			addressLine1: addressLine1.current.value,
			addressLine2: addressLine2.current.value,
			pincode: pincode.current.value,
			cartItems: cartItems,
		}

		try {
			fetch("http://localhost:5000/api/payment/cart", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			})
				.then((res) => {
					if (res.ok) return res.json()
					return res.json().then((json) => Promise.reject(json))
				})
				.then(({ url }) => {
					window.location = url
				})
				.catch((error) => {
					console.log(error)
					alert(error.message)
				})
		} catch (error) {
			console.log(error)
		}
		console.log("form submitted")
	}

	//**************drawer states************ */
	const [state, setState] = React.useState({
		right: false,
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			(event.type === "keydown" && event.key === "Tab") ||
			event.key === "Shift"
		) {
			return
		}

		setState({ ...state, [anchor]: open })
	}
	//**************drawer states************ */

	const list = (anchor) => (
		<Box
			sx={{
				width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
				marginLeft: "50px",
				marginTop: "100px",
			}}
			role='presentation'
		>
			<h2 style={{ color: "#fff" }}>Enter your address</h2>
			<List>
				<ListItem disablePadding>
					<Box
						component='form'
						sx={{
							"& > :not(style)": { m: 1, width: "25ch" },
						}}
						noValidate
						autoComplete='off'
					>
						<TextField
							id='standard-basic'
							label='Address Line 1'
							variant='standard'
							fullWidth
							inputRef={addressLine1}
							required
						/>
						<TextField
							id='standard-basic'
							label='Address Line 2'
							variant='standard'
							fullWidth
							inputRef={addressLine2}
							required
						/>
						<TextField
							id='standard-basic'
							label='Enter Pin Code'
							variant='standard'
							fullWidth
							inputRef={pincode}
							required
						/>
						<Button
							onClick={handleAddressForm}
							sx={{ background: "white" }}
							variant='contained'
						>
							Pay
						</Button>
					</Box>
				</ListItem>
			</List>
		</Box>
	)

	return (
		<div>
			<React.Fragment key={"right"}>
				<Button
					variant='contained'
					sx={{
						background: "grey",
					}}
					onClick={toggleDrawer("right", true)}
				>
					Proceed to Checkout
				</Button>
				<Drawer
					anchor='right'
					open={state["right"]}
					onClose={toggleDrawer("right", false)}
				>
					{list("right")}
				</Drawer>
			</React.Fragment>
		</div>
	)
}
