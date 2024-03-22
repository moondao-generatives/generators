/*demo */
const e=' * MoonDAO * PFP Generator * ';console.log("%c"+e,"background: #f32; color: #fff");

/* passing values */
let entityNumber = 0;
let entityCode = "x";



/* dummy data */
const entityNames = [
	"Astro Ventures",
	"Skylink Innovations",
	"Cosmic Dynamics",
	"Nova Propulsion Systems",
	"Stellar Aerospace Solutions",
	"Gravity Technologies",
	"Orbitron Industries",
	"Apex Space Technologies",
	"Celestial Exploration Co.",
	"Zenith Rocketry",
	"Nebula Avionics",
	"Helios Aeros",
	"Aurora Robotics",
	"Vortex Propulsion Labs",
	"Pulsar Satellite Systems",
	"Luna Aerospace Designs",
	"Nexus Space Technologies",
	"Omni Spatial Innovations",
	"Stardust Rocket Company",
	"Andromeda Space Solutions",
	"Phoenix Aerospace Ventures",
	"Quantum Propulsion Dynamics",
	"Solaris Space Industries",
	"Kronos Aerospace",
	"Interstellar Exploration Technologies",
	"Nebula Launch Systems",
	"Orion Space Ventures",
	"Helix Innovations",
	"Astro Propulsion Laboratories",
	"Satellite Technologies",
	"Smart Rocketry Solutions",
	"Vega Aerospace",
	"Polaris Systems",
	"Zenith Orbital",
	"Nova Satellite",
	"Pulsar Propulsion Co.",
	"Stardust Aerospace Ventures",
	"Celestial Avionics",
	"Aurora Rocketry Systems",
	"Helios Optics Industries",
	"Apex Satellite Solutions",
	"Gravity Propulsion Laboratories",
	"Cosmos Exploration Technologies",
	"Orbitron Space Ventures",
	"Luna Rocketry Innovations",
	"Skylink Satellite Systems",
	"Astro Avionics Co.",
	"Nebula Space—Robotics",
	"Quantum Aerospace",
	"Phoenix Propulsion"
];

function getRandomEntityName() {
	const randomIndex = Math.floor(Math.random() * entityNames.length);
	return entityNames[randomIndex];
}

function getRandomEntityNumber() {
	return Math.floor(Math.random() * 500) + 1;
}

function getRandomEntityCode() {
	const characters = '0ABCDEFabcdef0123456789';
	let code = '';
	for (let i = 0; i < 9; i++) {
		code += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return '0x'+code;
}

function setRandomEntityData() {
	entityCode = getRandomEntityCode();
	entityNumber = getRandomEntityNumber();
	const entityTitle = document.getElementById('entity-title');
	entityTitle.textContent = getRandomEntityName();
	const entityNumberAndCode = document.getElementById('entity-number-and-code');
	entityNumberAndCode.textContent = 'No. ' + entityNumber + ' — ' + entityCode;
	
	console.log('Entity Number:', entityNumber);
	console.log('Entity Code:', entityCode);
}

function generateRandomMemberCount() {
	return Math.floor(Math.random() * 12) + 1;
}



/* update member elements */
function updateMemberElements() {
	const membersElement = document.getElementById('members');
	const currentMemberCount = membersElement.childElementCount;
	const newMemberCount = generateRandomMemberCount();

	if (newMemberCount > currentMemberCount) {
		for (let i = 1; i <= newMemberCount; i++) {
			const newMemberElement = document.createElement('div');
			newMemberElement.className = 'member';
			newMemberElement.id = `member-${i}`;
			membersElement.appendChild(newMemberElement);
		}
	} else if (newMemberCount < currentMemberCount) {
		for (let i = currentMemberCount; i > newMemberCount; i--) {
			const memberElement = document.getElementById(`member-${i}`);
			membersElement.removeChild(memberElement);
		}
	}
}



/* img upload */

function createImageUploadElement() {
	const imageUploadElement = document.createElement('div');
	imageUploadElement.id = 'image-upload';
	imageUploadElement.innerHTML = `
    <input type="file" id="image-upload-input" accept="image/*" style="display: none;">
    <img id="uploaded-image" src="" alt="Uploaded Image" style="max-width: 100%; max-height: 500px; display: none;">
  `;
	return imageUploadElement;
}

function handleImageUpload(event) {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.onload = function(e) {
		const uploadImageButton = document.getElementById('upload-img-btn');
		const deleteImageButton = document.getElementById('delete-img-btn');
		const uploadedImage = document.getElementById('uploaded-image');
		uploadedImage.src = e.target.result;
		uploadedImage.style.display = 'block';
		uploadImageButton.querySelector('h3').textContent = 'Change current image';
		deleteImageButton.style.display = 'block';
	};

	reader.readAsDataURL(file);
}

function handleImageDelete() {
	const uploadImageButton = document.getElementById('upload-img-btn');
	const deleteImageButton = document.getElementById('delete-img-btn');
	const uploadedImage = document.getElementById('uploaded-image');
	uploadedImage.src = '';
	uploadedImage.style.display = 'none';
	uploadImageButton.querySelector('h3').textContent = 'no image (upload new image)';
	deleteImageButton.style.display = 'none';
}

function initializeImageUpload() {
	const entityInformation = document.getElementById('entity-information');
	const membersElement = document.getElementById('members');
	const uploadImageButton = document.getElementById('upload-img-btn');
	const deleteImageButton = document.getElementById('delete-img-btn');
	const imageUploadElement = createImageUploadElement();
	entityInformation.insertBefore(imageUploadElement, uploadImageButton);

	const imageUploadInput = document.getElementById('image-upload-input');
	imageUploadInput.addEventListener('change', handleImageUpload);

	uploadImageButton.addEventListener('click', () => {
		imageUploadInput.click();
	});
	deleteImageButton.addEventListener('click', handleImageDelete);
}



/* populate dummies */

function generateWalletAddress() {
	const privateKey = '0x' + crypto.getRandomValues(new Uint8Array(32)).reduce(
		(o, v) => o + ('00' + v.toString(16)).slice(-2),
		''
	);
	const wallet = new ethers.Wallet(privateKey);
	return wallet.address;
}

function populateMemberWalletAddresses() {
	const memberElements = document.querySelectorAll('.member');
	memberElements.forEach((memberElement) => {
		const walletAddress = generateWalletAddress();
		memberElement.textContent = walletAddress;
	});
}



/* pass parameters */

function generatorPrep() {
	const entityTitle = document.getElementById('entity-title').textContent;
	const memberElements = document.querySelectorAll('.member');
	const memberValues = Array.from(memberElements).map(element => element.textContent);
	const uploadedImage = document.getElementById('uploaded-image');

	const urlParams = new URLSearchParams();
	urlParams.append('entityTitle', entityTitle);
	urlParams.append('entityNumber', entityNumber);
	urlParams.append('entityCode', entityCode);
	urlParams.append('memberValues', JSON.stringify(memberValues));

	if (uploadedImage.style.display !== 'none') {
		urlParams.append('uploadedImage', uploadedImage.src);
	}

	const url = `generator.html?${urlParams.toString()}`;
	window.open(url, '_blank');
}



/* events */

window.addEventListener('load', function() {
	setRandomEntityData();
	initializeImageUpload();
	updateMemberElements();
	populateMemberWalletAddresses();
});

window.addEventListener('resize', adjustLayout);

function adjustLayout() {
	const viewer = document.getElementById('viewer');
	const windowWidth = window.innerWidth;

	if (windowWidth <= 600) {
		viewer.style.padding = '10px';
	} else {
		viewer.style.padding = '20px';
	}
}

//
adjustLayout();
