import React, {useEffect,useState} from 'react';
import defImg from './SSS6.jpg'; // DEFAULT IMG
import './App.css';


function App() {
	const [isMounted, setIsMounted] = useState(false);
	const [celestialLoaded, setCelestialLoaded] = useState(false);
	const [initLoaded, setInitLoaded] = useState(false);
	const [voronoiLoaded, setVoronoiLoaded] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) {
			console.log("...app loaded");
			const celestialScript = document.createElement('script');
			celestialScript.src = '/celestial.js';
			celestialScript.onload = () => {
				setCelestialLoaded(true);
			};
			document.body.appendChild(celestialScript);

			return () => {
				document.body.removeChild(celestialScript);
			};
		}
	}, [isMounted]);

	useEffect(() => {
		if (celestialLoaded) {
			console.log("...celestial.js loaded");
			const initScript = document.createElement('script');
			initScript.src = '/init.js';
			initScript.onload = () => {
				setInitLoaded(true);
			};
			document.body.appendChild(initScript);

			return () => {
				document.body.removeChild(initScript);
			};
		}
	}, [celestialLoaded]);

	useEffect(() => {
		if (initLoaded) {
			console.log("...init.js Loaded");
			const weightedVoronoiScript = document.createElement('script');
			weightedVoronoiScript.src = '/weighted-voronoi.js';
			weightedVoronoiScript.onload = () => {
				setVoronoiLoaded(true);
			};
			document.body.appendChild(weightedVoronoiScript);

			return () => {
				document.body.removeChild(weightedVoronoiScript);
			};
		}
	}, [initLoaded]);


	useEffect(() => {
		if (voronoiLoaded) {
			console.log("...weighted-voronoi.js Loaded");

			return () => {
			console.log("PFP generator ready");
			};
		}
	}, [voronoiLoaded]);

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
		div id = "celestial-map" > < /div> < /
		div >
	);
}

export default App;
