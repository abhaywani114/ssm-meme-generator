import React from 'react'
import {toPng} from 'html-to-image'

export default function Meme() {
	const [meme, setMeme] = React.useState({
			topText: "",
			bottomText: "",
			randomImage: ""
		});

	const [allMemeData, setAllMemeData] = React.useState([]);
	React.useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then(res => res.json())
			.then(apiData => {
				setAllMemeData(apiData.data.memes)
			});
	},[]);

	function getRandomImage() {
		const random_image = allMemeData[Math.floor(Math.random() * allMemeData.length)]

		if (random_image === undefined || random_image.url == "")
			return;

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

	const memeImageRef = React.useRef(null);
	function downloadMeme() {
		if (memeImageRef.current === null)
			return;
		memeImageRef.width = '1000px';
		toPng(memeImageRef.current, { cacheBust: true})
				.then( dataUrl => {
					const link = document.createElement('a')
					link.download = 'my-image-name.png'
					link.href = dataUrl
					link.click();
				}).catch(err => console.log(err));
	}

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

			<div className="meme-image" ref={memeImageRef} >
				<img src={meme.randomImage} />
				<h2 className="meme-image--text top">{meme.topText}</h2>
                <h2 className="meme-image--text bottom">{meme.bottomText}</h2>
			</div>
			{ meme.randomImage != "" && <div>
				<br/>
				<button className="download-btn" onClick={downloadMeme}>Download</button>
			</div>
			}		
		</>
	);
}
