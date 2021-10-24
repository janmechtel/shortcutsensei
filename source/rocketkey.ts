require('styled-notifications');

document.body.style.border = '5px solid red';

const successNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
});

class Shortcut {
	key: string; // the shortcut key sequence, eg. 'Shift+C'
	button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
	description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'

	constructor(shortcut: string, description: string, button?: string) {
		this.key = shortcut;
		this.description = description;
		this.button = button;
	}
}

const gmailShortcuts: Shortcut[] =[
	new Shortcut("C", "Compose a new message", "Compose"),
	new Shortcut("X", "Innovate a lot! (Test for mozilla)", "Innovation"),
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
