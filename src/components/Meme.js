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
					link.download = `ssm-memegenerator-${Math.floor(Math.random() * 1000)}.png`
					link.href = dataUrl
					link.click();
				}).catch(err => console.log(err));
	}

	const [textStyle, setTextStyle] = React.useState({
			text_1: {
				top: 0,
				left:0,
				right: 0,
			},
			text_2: {
				bottom:0,
				left:0,
				right:0,
			}
	});

	React.useEffect( () => {
		var currentX;
		var currentY;
		var initialX;
		var initialY;
		var xOffset = 0;
		var yOffset = 0;

		function dragStart(e) {
			  if (e.type === "touchstart") {
				initialX = e.touches[0].clientX - xOffset;
				initialY = e.touches[0].clientY - yOffset;
			  } else {
				initialX = e.clientX - xOffset;
				initialY = e.clientY - yOffset;
			  }			
		} 

		 function dragEnd(e) {
		  	initialX = currentX;
		 	initialY = currentY;
			drag(e);
		}
		
		function drag(e) {
			e.preventDefault();
			if (e.type === "touchmove") {
			  currentX = e.touches[0].clientX - initialX;
			  currentY = e.touches[0].clientY - initialY;
			} else {
			  currentX = e.clientX - initialX;
			  currentY = e.clientY - initialY;
			}

			xOffset = currentX;
			yOffset = currentY;
	
			console.log({currentX, currentY});
			setTextStyle(prevState => {
				return {
					...prevState,
					[e.target.id]: {
						fontSize: prevState[e.target.id].fontSize,
						top: currentY,
						left: currentX
					}
				}
			});

		}

		function addDragEvents(container) {
			container.addEventListener("touchstart", dragStart, false);
			container.addEventListener("touchmove", drag, false);

			container.addEventListener("dragstart", dragStart, false);
			container.addEventListener("dragend", drag, false);
		}
		addDragEvents(document.getElementById("text_1"));
		addDragEvents(document.getElementById("text_2"));

		return () => {
		}

	}, []);
	
	function changeFontSize(e) {
		const new_val = e.target.value;
		setTextStyle(prevState => {
			return {
				...prevState,
				text_1: {
					...prevState.text_1,
					fontSize: new_val + "px"
				},
				text_2: {
					...prevState.text_2,
					fontSize:new_val+"px"
				}
			}
		});			
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
					  <input type="range" id="font_size" name="size" min="1" max="100"
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
					style={textStyle.text_1}>{meme.topText}</span>

                <span 
					draggable="true" 
					className="meme-image--text" 
					id="text_2"
					style={textStyle.text_2}>{meme.bottomText}</span>
			</div>
			{ meme.randomImage != "" && <div>
				<br/>
				<button className="download-btn" onClick={downloadMeme}>Download</button>
			</div>
			}		
		</>
	);
}
