import React from 'react'

import navbarIco from '../images/troll_face.png'

export default function Navbar() {
	return (
		<nav className='nav-bar'>
			<div className='nav-bar--logo-container'>
				<img src={navbarIco} />
				<span>SSM MemeGenerator</span>
			</div>
			<div className="nav-bar--right-text">
				<span>IIT Certified</span>
			</div>
		</nav>
	)
}
