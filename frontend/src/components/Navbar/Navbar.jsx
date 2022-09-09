import React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdOutlineRestaurantMenu } from "react-icons/md"
import images from "../../constants/images"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { Link, useLocation, useNavigate } from "react-router-dom"

import "./Navbar.css"
import { CartState } from "../../context/cartItem_context"
const Navbar = () => {
	const [toggleMenu, setToggleMenu] = React.useState(false)
	const amount = 9
	const location = useLocation()
	const history = useNavigate()

	const redirect = () => {
		console.log("inside")
		history("/cart")
	}

	return (
		<nav className='app__navbar'>
			<div className='app__navbar-logo'>
				<img src={images.gericht} alt='app__logo' />
			</div>
			<ul className='app__navbar-links'>
				<li className='p__opensans'>
					<Link to='/'>Home</Link>
				</li>
				<li className='p__opensans'>
					<a href='#about'>About</a>
				</li>
				<li className='p__opensans'>
					<a href='#menu'>Menu</a>
				</li>
				<li className='p__opensans'>
					<a href='#awards'>Awards</a>
				</li>
				<li className='p__opensans'>
					<a
						href='#contact'
						onClick={() => {
							history("/menu")
						}}
					>
						Contact
					</a>
				</li>
				<li>
					<ShoppingCartOutlinedIcon
						sx={{
							border: "1px white",
							color: "white",
							margin: "0 0 0 1rem",
						}}
						onClick={redirect}
					/>
					<div className='amount-container'>
						<p className='total-amount'>{amount}</p>
					</div>
				</li>
			</ul>
			<div className='app__navbar-login'>
				<a href='#login' className='p__opensans'>
					Log In / Registration
				</a>
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
