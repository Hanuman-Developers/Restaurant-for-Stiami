import * as React from "react"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

export default function AddressDrawer() {
	const [state, setState] = React.useState({
		right: false,
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.key === "Tab" || event.key === "Shift") {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const list = (anchor) => (
		<Box
			sx={{
				width: anchor === "top" || anchor === "bottom" ? "auto" : 300,
				marginLeft: "100px",
				marginTop: "100px",
			}}
			role='presentation'
			// onClick={toggleDrawer(anchor, false)}
			// onKeyDown={toggleDrawer(anchor, false)}
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
						/>
						<TextField
							id='standard-basic'
							label='Address Line 2'
							variant='standard'
							fullWidth
						/>
						<TextField
							id='standard-basic'
							label='Enter Pin Code'
							variant='standard'
							fullWidth
						/>
						<Button sx={{ background: "white" }} variant='contained'>
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
