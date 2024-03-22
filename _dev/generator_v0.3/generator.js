/* demo */
const e=' * MoonDAO * PFP Generator * ';console.log("%c"+e,"background: #90e; color: #fff");
/* events */

window.addEventListener('load', function() {
	const urlParams = new URLSearchParams(window.location.search);
	const entityTitle = urlParams.get('entityTitle');
	const entityNumber = parseInt(urlParams.get('entityNumber'));
	const entityCode = urlParams.get('entityCode');
	const memberValues = JSON.parse(urlParams.get('memberValues'));
	const uploadedImage = urlParams.get('uploadedImage');

	if (urlParams.toString()) {
		console.log('Entity Title:', entityTitle);
		console.log('Entity Number:', entityNumber);
		console.log('Entity Code:', entityCode);
		console.log('Member Values:', memberValues);
		console.log('Uploaded Image:', uploadedImage);

		document.getElementById('entity-title').textContent = entityTitle;

		const entityNumberValue = entityNumber;
		const entityCodeValue = entityCode;
		const memberValuesArray = memberValues;

		if (uploadedImage) {
			const pfpViewer = document.getElementById('pfp-viewer');
			const imgElement = document.createElement('img');
			imgElement.id = 'loaded-image';
			imgElement.src = uploadedImage;
			pfpViewer.insertBefore(imgElement, pfpViewer.firstChild);
		}
	}
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
