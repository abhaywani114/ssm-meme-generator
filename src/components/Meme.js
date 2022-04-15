import React from 'react'

import memesData from '../memesData'

export default function Meme() {
	const [meme, setMeme] = React.useState({
			topText: "",
			bottomText: "",
			randomImage: ""
		});

	const [allMemeImage, setAllMemeImage] = React.useState(memesData);

	function getRandomImage() {
		const random_image = allMemeImage.data.memes[Math.floor(Math.random() * allMemeImage.data.memes.length)]
		setMeme((preMeme) => ({
			...preMeme,
			randomImage: random_image.url
		})); 
	}

	function handleFields(event) {
		const {name, value} = event.target;
		setMeme(prevState => {
			return {
					...prevState,
					[name]:value
			};
		});
	}

	console.log('meme', meme)

	return (
		<>
			<div className="form-container">
				<div className="form-text-inputs">
					<input 
						type="text" 
						placeholder="Top Line" 
						name="topText"
						onChange={handleFields}
						value={meme.topText}
					/>
					<input 
						type="text" 
						placeholder="Bottom Line"
						name="bottomText"
						onChange={handleFields}
						value={meme.bottomText}
					 />
				</div>
				<div className="form-submit">
					<button onClick={getRandomImage}>Get a new meme image</button>
				</div>
			</div>

			<div className="meme-image">
				<img src={meme.randomImage} />
				<h2 className="meme-image--text top">{meme.topText}</h2>
                <h2 className="meme-image--text bottom">{meme.bottomText}</h2>
			</div>
		</>
	);
}
