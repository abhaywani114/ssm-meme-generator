import React from 'react'

import Navbar from './components/Navbar'
import Meme from './components/Meme'

import './style.css'

export default function App() {
	return (
		<>
			<Navbar />
			<main>
				<Meme />
				<br/><br/>
				<div className="fotter-sign">
					<span>Developed By:</span>
					<a 	className="" target="_blank"
						href="https://abhaywani114.github.io/">Abrar Ajaz Wani</a>
				</div>
			</main>
		</>
	)
}
