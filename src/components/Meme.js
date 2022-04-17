import React from 'react'
import {toPng} from 'html-to-image'
import DragText from '../plugins/DragText'

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
					link.download = `ssm-memegenerator-${Math.floor(Math.random() * 1000)}.png`
					link.href = dataUrl
					link.click();
				}).catch(err => console.log(err));
	}

	const [posText1, setPosText1] = React.useState({
			transform: `translate3d(0px, 0px, 0px)`
	});

	const [posText2, setPosText2] = React.useState({
			transform: `translate3d(0px, 0px, 0px)`
	});


	React.useEffect( () => {
		const memeTextDrag_1 = new DragText("#text_1", function(x, y) { 
				setPosText1({ transform: `translate3d(${x}px, ${y}px, 0px)`});
		});

		const memeTextDrag_2 = new DragText("#text_2", function(x, y) { 
				setPosText2({ transform: `translate3d(${x}px, ${y}px, 0px)`});
		});


		return () => {
				memeTextDrag_1.cleanDragText();
				memeTextDrag_2.cleanDragText();
		}

	}, []);
	
	const [textFont, setTextFont] = React.useState({fontSize:'16px'});
	function changeFontSize(e) {
		const new_val = e.target.value + 'px';
		setTextFont({fontSize: new_val});			
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
				<div className="font-slide">
					  <label htmlFor="font_size">Font Size:</label>
					  <input type="range" id="font_size" name="size" min="1" max="100" defaultValue={parseInt(textFont.fontSize)}
						onChange={changeFontSize} />
				</div>
				<div className="form-submit">
					<button onClick={getRandomImage}>Get a new meme image</button>
				</div>
			</div>

			<div className="meme-image" ref={memeImageRef} >
				<img src={meme.randomImage} />
				<span 
					draggable="true" 
					className="meme-image--text" 
					id="text_1"
					style={{...posText1, ...textFont}}>{meme.topText}</span>

                <span 
					draggable="true" 
					className="meme-image--text" 
					id="text_2"
					style={{...posText2, ...textFont, bottom:0}}>{meme.bottomText}</span>
			</div>
			{ meme.randomImage != "" && <div>
				<br/>
				<button className="download-btn" onClick={downloadMeme}>Download</button>
			</div>
			}		
		</>
	);
}
