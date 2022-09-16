import React, { useEffect, useState } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import { isDateSelectionValid } from "@fullcalendar/react"

const steps = ["Ordered", "Shipped", "Delivered"]

export default function OrderStatus() {
	const _id = "6323bd64ba23db2ec19abee0"

	const getOrderURL = `/orders/${_id}`
	const [isShipped, setShipped] = useState(false)
	const [isDelivered, setDelivered] = useState(false)

	useEffect(async () => {
		const prod = {
			_id: _id,
		}
		try {
			const response = await axios.post(getOrderURL, prod, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			})

			if (response.data.orderStatus == "Shipped") {
				console.log("yes")
				setShipped(true)
			}
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}, [])

	const getState = () => {
		if (isDelivered) {
			return 3
		} else if (isShipped) {
			return 2
		} else {
			return 1
		}
	}

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={getState()} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	)
}
