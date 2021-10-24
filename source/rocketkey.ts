require('styled-notifications');

import {Shortcut} from './shortcut';

document.body.style.border = '5px solid red';

const successNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
});

const gmailShortcuts: Shortcut[] =[
	// new Shortcut(
		// key: string; // the shortcut key sequence, eg. 'Shift+C'
		// button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
		// description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	// )
	new Shortcut("X", "Innovate a lot! (Test for mozilla)", "Innovation"),
	new Shortcut("C", "Compose a new message", "Compose"),
];

const clickHandler = function (event: MouseEvent) {
	const innerText: string = event.explicitOriginalTarget.textContent;
	const outerHTML: string = event.explicitOriginalTarget.outerHTML;
	console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);
	console.debug('Click event:', event);

	for (const shortcut of gmailShortcuts) {
		if (innerText === shortcut.button || outerHTML.includes(shortcut.button)) {
			successNotification({
				title: `Press ${shortcut.key}`,
				message: `For "${shortcut.button}" try pressing "${shortcut.key}" instead ;-)`,
			});
			break;
		}
	}
};

document.addEventListener('click', clickHandler);
