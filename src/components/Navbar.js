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
				<a target="_blank" href="https://abhaywani114.github.io">By: Abrar Ajaz</a>
			</div>
		</nav>
	)
}
