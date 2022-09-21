import React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdOutlineRestaurantMenu } from "react-icons/md"
import images from "../../constants/images"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { CartState } from "../../context/cartItem_context"
import axios from "../../apis/axios"
import { Link } from "react-router-dom"
const Navbar = () => {
	const [toggleMenu, setToggleMenu] = React.useState(false)
	const location = useLocation()
	const history = useNavigate()
	const { amount, auth, setAuth } = CartState()

	//*************mui states********** */
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	//*************mui states********** */

	const redirect = () => {
		console.log("inside")
		history("/cart")
	}
	const logout = async () => {
		setAuth({})
		// window.open("http://localhost:5000/api/auth/logout", "_self");
		fetch("http://localhost:5000/api/auth/logout", {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true,
			},
		})
			.then((response) => {
				console.log("Logged out")
				history("/")
			})
			.catch((err) => {
				console.log(err)
			})
		// const response = await axios.get("http://localhost:5000/api/auth/logout", {
		//   headers: {
		//     "Content-Type": "application/json",
		//     "Access-Control-Allow-Credentials": true,
		//   },
		//   withCredentials: true,
		// });
	}

	const handleMyorders = () => {
		handleClose()
		history("/my-orders")
	}

	return (
		<nav className='app__navbar'>
			<div className='app__navbar-logo'>
				<img src={images.gericht} alt='app__logo' />
			</div>
			<ul className='app__navbar-links'>
				<li className='p__opensans'>
					<a
						href=''
						onClick={() => {
							history("/")
						}}
					>
						Home
					</a>
				</li>
				<li className='p__opensans'>
					<a href='#about'>About</a>
				</li>
				<li className='p__opensans '>
					<Link to='/menu'>Menu</Link>
				</li>
				<li className='p__opensans'>
					<a href='#awards'>Awards</a>
				</li>
				<li className='p__opensans'>
					<a href='#contact'>Contact</a>
				</li>
				<li className='p__opensans cart__nav'>
					<div className='amount__container'>
						<p className='total__amount'>{amount}</p>
					</div>
					<ShoppingCartOutlinedIcon
						sx={{
							border: "1px white",
							color: "white",
							margin: "0 0 0 1rem",
						}}
						onClick={redirect}
					/>

					{/* <ShoppingCartOutlinedIcon
            sx={{
              border: "1px white",
              color: "white",
              margin: "0 0 0 1rem",
            }}
            onClick={redirect}
          />

          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div> */}
				</li>
			</ul>
			<div className='app__navbar-login'>
				{auth.length > 0 ? (
					<div className='left__menubtn p__opensans'>
						<Button
							id='basic-button'
							aria-controls={open ? "basic-menu" : undefined}
							aria-haspopup='true'
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
							sx={{ color: "white" }}
						>
							Dashboard
						</Button>
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<MenuItem onClick={handleMyorders}>My orders</MenuItem>
							<MenuItem onClick={logout}>Logout</MenuItem>
						</Menu>
					</div>
				) : (
					<a
						href=''
						className='p__opensans'
						onClick={() => {
							history("/login")
						}}
					>
						Log In / Registration
					</a>
				)}
				<div />
				<Link to='/tables' className='p__opensans'>
					Book Table
				</Link>
			</div>
			<div className='app__navbar-smallscreen'>
				<GiHamburgerMenu
					color='#fff'
					fontSize={27}
					onClick={() => setToggleMenu(true)}
				/>
				{toggleMenu && (
					<div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
						<MdOutlineRestaurantMenu
							fontSize={27}
							className='overlay__close'
							onClick={() => setToggleMenu(false)}
						/>
						<ul className='app__navbar-smallscreen_links'>
							<li>
								<a href='#home' onClick={() => setToggleMenu(false)}>
									Home
								</a>
							</li>
							<li>
								<a href='#about' onClick={() => setToggleMenu(false)}>
									About
								</a>
							</li>
							<li>
								<a href='#menu' onClick={() => setToggleMenu(false)}>
									Menu
								</a>
							</li>
							<li>
								<a href='#awards' onClick={() => setToggleMenu(false)}>
									Awards
								</a>
							</li>
							<li>
								<a href='#contact' onClick={() => setToggleMenu(false)}>
									Contact
								</a>
							</li>
							<ShoppingCartOutlinedIcon
								sx={{
									border: "1px white",
									color: "white",
									margin: "0 0 0 1rem",
									align: "center",
								}}
							/>
							<div className='amount-container'>
								<p className='total-amount'>{amount}</p>
							</div>
						</ul>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
