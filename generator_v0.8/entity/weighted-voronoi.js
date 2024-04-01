// Weighted Voronoi Stippling by Daniel Shiffman [MIT]
/* Edited in 2024 for MoonDAO by Santiago Itzcoatl */

let points = [];
let delaunay, voronoi;

// - - preload

function preload() {
	urlIMG = document.getElementById("process-image").src;
	loadedIMG = loadImage(urlIMG, imgLoadSuccess, imgLoadFailure);
	// changeBioText(defaultBio);
	// console.log("— bg img loaded: " + urlIMG); //base64
	// console.log("wait...");
}

function imgLoadSuccess() {
	// img setup:
	loadedIMG.resize(720, 720);
	colorPalette = getColorPalette(loadedIMG, 3);
	
	//console.log(colorPalette);
	//console.log('— img resized');
	loader = document.getElementById("loadIndicator");
	loader.style.display= "none";
}

function imgLoadFailure(event) {
	console.error('— error while loading img', event);
}

// -- setup

function setup() {
	console.log(" ★ p5js ★ ");
	const canvas = createCanvas(loadedIMG.width, loadedIMG.height);
	canvas.parent('canvas-container');
	imageMode(CENTER);
	for (let i = 0; i < 290; i++) {
		let x = random(width);
		let y = random(height);
		let col = loadedIMG.get(x, y);
		if (random(100) > brightness(col)) {
			points.push(createVector(x, y));
		} else {
			i--;
		}
	}

	delaunay = calculateDelaunay(points);
	voronoi = delaunay.voronoi([0, 0, width, height]);
	//noLoop();
	
	console.log(" ★★★ ready ★★★ ");
}

// -- main loop

function draw() {
	clear();

	let contxt = canvas.getContext("2d", {
		willReadFrequently: true
	});
	contxt.filter = 'blur(' + passedBlurValue + 'px)';
	image(loadedIMG, width / 2, height / 2, 720, 720);
	contxt.filter = 'blur(0px)';

	let polygons = voronoi.cellPolygons();
	let cells = Array.from(polygons);

	let centroids = new Array(cells.length);
	let weights = new Array(cells.length).fill(0);
	let counts = new Array(cells.length).fill(0);
	let avgWeights = new Array(cells.length).fill(0);
	for (let i = 0; i < centroids.length; i++) {
		centroids[i] = createVector(0, 0);
	}

	loadedIMG.loadPixels();
	let delaunayIndex = 0;
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			let index = (i + j * width) * 4;
			let r = loadedIMG.pixels[index + 0];
			let g = loadedIMG.pixels[index + 1];
			let b = loadedIMG.pixels[index + 2];
			let bright = (r + g + b) / 3;
			let weight = 1 - bright / 255;
			delaunayIndex = delaunay.find(i, j, delaunayIndex);
			centroids[delaunayIndex].x += i * weight;
			centroids[delaunayIndex].y += j * weight;
			weights[delaunayIndex] += weight;
			counts[delaunayIndex]++;
		}
	}

	let maxWeight = 0;
	for (let i = 0; i < centroids.length; i++) {
		if (weights[i] > 0) {
			centroids[i].div(weights[i]);
			avgWeights[i] = weights[i] / (counts[i] || 1);
			if (avgWeights[i] > maxWeight) {
				maxWeight = avgWeights[i];
			}
		} else {
			centroids[i] = points[i].copy();
		}
	}

	for (let i = 0; i < points.length; i++) {
		points[i].lerp(centroids[i], 0.5);
	}

	for (let i = 0; i < points.length; i++) {
		let v = points[i];
		let nx = 3;
		let mx = 37;
		let col = loadedIMG.get(v.x, v.y);
		//stroke(0);
		stroke(col);
		let sw = map(avgWeights[i], 0, maxWeight, nx, mx, true);
		strokeWeight(sw);
		point(v.x, v.y);
	}

	delaunay = calculateDelaunay(points);
	voronoi = delaunay.voronoi([0, 0, width, height]);
}

function calculateDelaunay(points) {
	let pointsArray = [];
	for (let v of points) {
		pointsArray.push(v.x, v.y);
	}
	return new d3.Delaunay(pointsArray);
}
