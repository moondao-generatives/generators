/* Edited in 2024 for MoonDAO by Santiago Itzcoatl */

/* ---------------------------------------------------------------- */

var mwColor = getRandomHSLuvColor(80);
var mwOpacity = 0.35; // 0.35
var pfpBgColor = setPfpBgColor(mwColor);
var pfpBioText = "—";

var loadedIMG;
var colorPalette = [];

const e = ' * MoonDAO * PFP Generator * ';
console.log("%c" + e, "background:" + mwColor + "; color: #fff");

/* ---------------------------------------------------------------- */
// - - - Main Setup:

document.getElementById("pfp").style.backgroundColor = pfpBgColor;

let defaultImages = [
	"images/FS-14.jpg",
	"images/FS-13.jpg",
	"images/FS-10.jpg",
	"images/FS-9.jpg",
	"images/FS-8.jpg",
	"images/FS-7.jpg",
	"images/FS-6.jpg",
	"images/FS-5.jpg",
	"images/FS-4.jpg",
	"images/FS-3.jpg",
	"images/FS-1.jpg"
];
let randomImageIndex = Math.floor(Math.random() * defaultImages.length);
var defaultImage = defaultImages[randomImageIndex];

document.getElementById("process-image").src = defaultImage;

let dummyBios = [
	"Nova Propulsion Systems: Founded by a team of experienced aerospace engineers, Nova Propulsion Systems is revolutionizing the way spacecraft navigate the cosmos. Their proprietary ion thruster technology offers unparalleled efficiency and reliability, enabling satellites and space probes to travel further and faster while consuming less fuel. By miniaturizing these thrusters and making them more affordable, Nova Propulsion Systems is opening up new possibilities for exploration and commerce in the final frontier. The startup has already secured contracts with several major satellite operators and is poised for rapid growth in the coming years.",
	"Astral Insights: Astral Insights is on a mission to unlock the full potential of Earth observation data. By combining cutting-edge machine learning algorithms with a vast network of satellites, the startup is able to provide near-real-time analysis of everything from crop yields to urban traffic patterns. Their cloud-based platform makes it easy for businesses, governments, and researchers to access and utilize this valuable data, leading to more informed decision-making and improved outcomes across a wide range of industries. With a strong focus on sustainability and social impact, Astral Insights is committed to using its technology to help solve some of the world's most pressing challenges.",
	"QuantumSat: QuantumSat is at the forefront of the quantum computing revolution in aerospace. The startup is developing advanced quantum sensors and communication systems that promise to transform the way spacecraft operate and interact. By harnessing the power of quantum entanglement, QuantumSat's technology enables secure, instantaneous communication over vast distances, as well as ultra-precise navigation and timing. The company is also working on quantum-enhanced imaging systems that could reveal unprecedented details about distant planets and galaxies. With a team of world-renowned quantum physicists and aerospace engineers, QuantumSat is poised to make science fiction a reality.",
	"Lunar Outpost: Lunar Outpost is dedicated to establishing a permanent human presence on the Moon. The startup is developing a range of technologies to support this ambitious goal, from autonomous mining robots that can extract valuable resources from the lunar regolith to inflatable habitats that can house astronauts for extended periods. Lunar Outpost is also working on advanced life support systems and renewable energy solutions to ensure the sustainability of lunar operations. By partnering with space agencies and private companies around the world, Lunar Outpost is laying the groundwork for a new era of exploration and commerce on the Moon.",
	"Orbital Assembly: Orbital Assembly is on a mission to build the first commercial space station. Using advanced robotics and modular design principles, the startup is developing a scalable platform that can be easily expanded and customized to meet the needs of a wide range of customers, from space tourists to scientific researchers. The station will feature comfortable living quarters, state-of-the-art research facilities, and stunning views of the Earth and stars. Orbital Assembly is also developing a fleet of reusable spacecraft to transport people and cargo to and from the station, making space travel more accessible and affordable than ever before. With a talented team of engineers and a bold vision for the future, Orbital Assembly is poised to revolutionize the way we live and work in space."
]
let randomBioIndex = Math.floor(Math.random() * dummyBios.length);
var defaultBio = dummyBios[randomBioIndex];

drawAddressEntity("0xfba49d8c29cc8d3d031b662b7b09448023e10df2"); // <-- must be current user

// - - - Celestial map config

Celestial.display({
	location: true,
	moonDao: true,
	projection: "airy",
	datapath: "stars-data/", // Path/URL to data files
	controls: false, // zoom controls
	form: true,
	formFields: {
		"location": false,
		"general": false,
		"stars": true,
		"dsos": false,
		"constellations": false,
		"lines": false,
		"other": false,
		"download": false
	}, // ----------------------------------------------------------
	lines: { // Display & styles
		graticule: {
			show: false
		},
		equatorial: {
			show: true,
			stroke: "#ccc",
			width: 1.4,
			opacity: 0.25
		},
		ecliptic: {
			show: true,
			stroke: mwColor,
			width: 3.2,
			opacity: 0.7
		},
		galactic: {
			show: false
		},
		supergalactic: {
			show: false
		}
	}, // ----------------------------------------------------------
	planets: { // Planets
		show: true,
		symbolType: "symbol",
		names: true,
		namesType: "en"
	}, // ----------------------------------------------------------
	stars: { // Stars
		show: true,
		limit: 4.2, // Show only stars brighter than limit magnitude
		colors: false, // use style setting below if false
		style: {
			fill: "#ffffff",
			opacity: 1
		},
		size: 8,
		exponent: -0.185,
		designation: false,
		designationType: "desig",
		propername: true,
		propernameType: "en"
	}, // ----------------------------------------------------------
	dsos: { // Deep Space Objects 
		show: false,
		limit: 6, // Show only DSOs brighter than limit magnitude
		colors: true, // use style setting below if false
		style: {
			fill: "#cccccc",
			stroke: "#cccccc",
			width: 2,
			opacity: 1
		}, // Default style for dsos
		size: 0.1,
		names: false, // DSO names
		exponent: 0.32, // Scale exponent for DSO size, larger = more non-linear
	}, // ----------------------------------------------------------
	constellations: { // Constellations
		names: false,
		lines: true,
		lineStyle: {
			stroke: "#fff",
			width: 0.75,
			opacity: 0.52
		},
		bounds: false
	}, // ----------------------------------------------------------
	mw: {
		show: true, // Milky Way
		style: {
			fill: mwColor,
			opacity: mwOpacity
		}
	}, // ----------------------------------------------------------
	advanced: false,
	background: {
		fill: "#071536",
		opacity: 0,
		stroke: "#ffffff",
		width: 0.25
	}
});

// - - -

window.onload = function mainLoadingFunction() {
	console.log(" ★ ");
	changeBioText(defaultBio);
}

// - - - Colors ! (fun)

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function getRandomHSLuvColor(saturation) {
	var cHSLuv = new Hsluv();
	cHSLuv.hsluv_h = Math.random() * 360;
	cHSLuv.hsluv_l = Math.random() * 100;
	cHSLuv.hsluv_s = saturation;
	cHSLuv.hsluvToHex();
	return cHSLuv.hex;
}

function setPfpBgColor(vcolor) {
	var cHSLuv = new Hsluv();
	cHSLuv.hex = vcolor;
	cHSLuv.hsluv_l = 20 + (Math.random() * 20);
	cHSLuv.hsluvToHex();
	return cHSLuv.hex;
}

function hexToRgb(hex) {
	hex = hex.replace('#', '');

	var bigint = parseInt(hex, 16);

	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;

	return color(r, g, b);
}

function getColorPalette(img, numColors) {
	let pixels = [];

	img.loadPixels();
	for (let i = 0; i < img.pixels.length; i += 4) {
		let r = img.pixels[i];
		let g = img.pixels[i + 1];
		let b = img.pixels[i + 2];
		let a = img.pixels[i + 3];
		if (a >= 125) {
			pixels.push([r, g, b]);
		}
	}

	let clusters = [];
	for (let i = 0; i < numColors; i++) {
		clusters.push([]);
	}

	for (let i = 0; i < pixels.length; i++) {
		let minDistance = Infinity;
		let closestCluster = 0;

		for (let j = 0; j < clusters.length; j++) {
			if (clusters[j].length === 0) {
				closestCluster = j;
				break;
			}

			let distance = colorDistance(pixels[i], clusters[j][0]);
			if (distance < minDistance) {
				minDistance = distance;
				closestCluster = j;
			}
		}

		clusters[closestCluster].push(pixels[i]);
	}

	let avgColors = [];
	for (let i = 0; i < clusters.length; i++) {
		let sumR = 0;
		let sumG = 0;
		let sumB = 0;

		for (let j = 0; j < clusters[i].length; j++) {
			sumR += clusters[i][j][0];
			sumG += clusters[i][j][1];
			sumB += clusters[i][j][2];
		}

		let avgR = Math.round(sumR / clusters[i].length);
		let avgG = Math.round(sumG / clusters[i].length);
		let avgB = Math.round(sumB / clusters[i].length);

		avgColors.push([avgR, avgG, avgB]);
	}

	const hexPalette = avgColors.map(color => {
		const [r, g, b] = color;
		const hexR = isNaN(r) ? "00" : r.toString(16).padStart(2, "0");
		const hexG = isNaN(g) ? "00" : g.toString(16).padStart(2, "0");
		const hexB = isNaN(b) ? "00" : b.toString(16).padStart(2, "0");
		return `#${hexR}${hexG}${hexB}`;
	});

	return hexPalette;
}

function colorDistance(color1, color2) {
	let rDiff = color1[0] - color2[0];
	let gDiff = color1[1] - color2[1];
	let bDiff = color1[2] - color2[2];
	return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

// - - - UI data

function changeBioText(newText) {
	let svgObject = document.getElementById("bioText").contentDocument;
	var bioTextContent = svgObject.getElementById("bioTextContent");
	bioTextContent.textContent = newText;
}

function changeBioStyle(atr, val) {
	const textPath = document.querySelector('#bioTextPath textPath');
	textPath.style[atr] = val;
}

function drawAddressEntity(currentAddressHex) {
	currentAddressHex = currentAddressHex.slice(2);
	// Check if currentAddressHex is a string of exactly 40 characters
	if (typeof currentAddressHex !== 'string' || currentAddressHex.length !== 40) {
		console.log("invalid eth address");
		return;
	}

	// Convert currentAddressHex to decimal values
	const currentAddressDec = currentAddressHex.split('').map(char => parseInt(char, 16));

	// SVG paths
	const paths = [
		"M349.556,227.3a10.476,10.476,0,0,0,20.888,0l1.436-18.252a11.917,11.917,0,1,0-23.761,0Z",
		"M371.6,212.646a11.633,11.633,0,0,1-23.194,0l-1.269-16.12a12.905,12.905,0,1,1,25.731,0Z",
		"M372.75,197.994a12.789,12.789,0,0,1-25.5,0q-.551-6.994-1.1-13.988a13.894,13.894,0,1,1,27.7,0Q373.3,191,372.75,197.994Z",
		"M373.9,183.343a13.946,13.946,0,0,1-27.806,0q-.467-5.928-.933-11.856a14.882,14.882,0,1,1,29.673,0Q374.37,177.415,373.9,183.343Z",
		"M375.056,168.691a15.1,15.1,0,0,1-30.113,0l-.765-9.724a15.871,15.871,0,1,1,31.643,0Z",
		"M376.21,154.039a16.26,16.26,0,0,1-32.419,0l-.6-7.592a16.859,16.859,0,1,1,33.614,0Z",
		"M377.363,139.387a17.416,17.416,0,0,1-34.725,0l-.43-5.46a17.847,17.847,0,1,1,35.585,0Z",
		"M378.516,124.735a18.573,18.573,0,0,1-37.032,0q-.131-1.664-.262-3.328a18.836,18.836,0,1,1,37.555,0Q378.647,123.071,378.516,124.735Z",
		"M340.331,110.083a19.73,19.73,0,0,0,39.338,0q.047-.6.094-1.2a19.824,19.824,0,1,0-39.526,0Q340.284,109.485,340.331,110.083Z",
		"M380.822,95.431a20.887,20.887,0,0,1-41.644,0q-.456-5.792-.912-11.584a21.8,21.8,0,1,1,43.468,0Q381.278,89.639,380.822,95.431Z",
		"M381.975,80.779a22.043,22.043,0,0,1-43.95,0q-.372-4.726-.744-9.453a22.789,22.789,0,1,1,45.438,0Q382.347,76.053,381.975,80.779Z",
		"M383.128,66.127a23.2,23.2,0,0,1-46.256,0q-.288-3.661-.576-7.321a23.778,23.778,0,1,1,47.409,0Q383.417,62.467,383.128,66.127Z",
		"M335.719,51.475a24.356,24.356,0,0,0,48.563,0q1.214-15.424,2.428-30.849a338.875,338.875,0,0,0-53.419,0Q334.5,36.051,335.719,51.475Z",
		"M334.565,36.823a25.513,25.513,0,0,0,50.869,0l1.275-16.2a338.875,338.875,0,0,0-53.419,0Z",
		"M333.412,22.171a26.67,26.67,0,0,0,53.175,0q.061-.773.122-1.545a338.875,338.875,0,0,0-53.419,0Q333.352,21.4,333.412,22.171Z",
		"M360,16.697A2.88,2.88,0,1,1,357.12,19.577,2.88,2.88,0,0,1,360,16.697Z"
	];

	// Create a new SVG element
	let svgAddressGeometric = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svgAddressGeometric.setAttribute('viewBox', '0 0 720 720');
	svgAddressGeometric.setAttribute('width', '720');
	svgAddressGeometric.setAttribute('height', '720');
	svgAddressGeometric.setAttribute('id', 'addressEntity');

	let pfpContainerRef = document.querySelector('#pfp');

	// Loop through each element of currentAddressDec
	currentAddressDec.forEach((value, index) => {

		if (value >= 0 && value <= 15) {
			const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			pathElement.setAttribute('d', paths[value]);
			const rotationAngle = index * 9;
			pathElement.setAttribute('transform', `rotate(${rotationAngle}, 360, 360)`);
			pathElement.setAttribute('fill', pfpBgColor);
			pathElement.setAttribute('opacity', '0.36');
			svgAddressGeometric.appendChild(pathElement);
		}
	});
	// Append the SVG
	pfpContainerRef.appendChild(svgAddressGeometric);
}

// - - - UI to P5js

let passedBlurValue = 70;

function blurValue(val) {
	passedBlurValue = val;
}

// - - - PFP image i/o

document.getElementById("uploadHidden").addEventListener("change", function(e) {
	console.log("...uploading");
	loader = document.getElementById("loadIndicator");
	loader.style.display = "block";
	var file = e.target.files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		document.getElementById("process-image").src = event.target.result;
		console.log("image loaded.");
		preload();
	};
	reader.readAsDataURL(file);
});

function downloadScreenShot(url, fullName) {
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.style.display = 'none';
	anchor.setAttribute('download', fullName);
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
}

function screenshot(imgNode, format = "jpg", quality = 0.97, name = "MoonDAO-PFP") {
	const canvasT = document.createElement("canvas");
	canvasT.width = imgNode.width;
	canvasT.height = imgNode.height;
	const context = canvasT.getContext("2d");
	context.filter = getComputedStyle(imgNode).filter;
	//imgNode.setAttribute("crossOrigin", "anonymous");
	context.drawImage(imgNode, 0, 0, canvasT.width, canvasT.height);
	const url = canvasT.toDataURL(`image/${format}`, quality);
	downloadScreenShot(url, `${name}.${format}`);
}

function uploadImg() {
	document.getElementById('uploadHidden').click();
}

function downloadImg() {
	console.log("... downloading pfp");
	const fileName = "MoonDAO-PFP";
	const pfpElement = document.getElementById('pfp');
	html2canvas(pfpElement).then(function(canvas) {
		const link = document.createElement('a');
		link.href = canvas.toDataURL('image/jpeg');
		link.download = fileName + '.jpg';
		link.click();
		console.log("pfp downloaded (!)");
	});
}

function passImgData() {
	console.log("... passing pfp img data");
	const fileName = getRandomColor();
	const pfpElement = document.getElementById('pfp');
	html2canvas(pfpElement).then(function(canvas) {
		const dataURL = canvas.toDataURL('image/jpeg');
		//console.log(dataURL);
		console.log("img data sent: ");
		return dataURL;
	});
}
