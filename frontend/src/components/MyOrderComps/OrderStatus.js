import React, { useEffect, useState } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import { isDateSelectionValid } from "@fullcalendar/react"

const steps = ["Ordered", "Shipped", "Delivered"]

export default function OrderStatus({ status }) {
	const getState = () => {
		if (status === "delivered") {
			return 3
		} else if (status === "ordered") {
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
