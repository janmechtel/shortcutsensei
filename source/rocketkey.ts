require('styled-notifications');

document.body.style.border = '5px solid yellow';

const successNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
});

const clickHandler = function (event: MouseEvent) {
	const innerText: string = event.explicitOriginalTarget.textContent;
	const outerHTML: string = event.explicitOriginalTarget.outerHTML;
	console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);
	console.debug('Click event:', event);

	if (innerText === 'Innovation' || outerHTML.includes('Compose')) {
		// Use the same instance but pass a title
		successNotification({
			title: 'Press C',
			message: 'For "Compose" try pressing "C" instead ;-)',
		});
	}
};

document.addEventListener('click', clickHandler);
