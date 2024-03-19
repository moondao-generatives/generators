import defImg from './00.jpg';
import './App.css';

export function AddLibrary(urlOfTheLibrary) {
	const script = document.createElement("script");
	script.src = urlOfTheLibrary;
	script.async = true;
	document.body.appendChild(script);
}

function App() {
	return ( <
		div id = "pfp" >
		<
		img alt = "default-img"
		id = "process-image"
		src = {
			defImg
		}
		/> <
		div id = "canvas-container" > < /div> <
		div id = "celestial-map" > < /div> <
		/div>
    
    
    
	);
}

export default App;
