require('styled-notifications');

import { Shortcut } from './shortcut';

document.body.style.border = '5px solid green';

const successNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
});

const gmailShortcuts: Shortcut[] = [
	// new Shortcut(
	// key: string; // the shortcut key sequence, eg. 'Shift+C'
	// button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
	// description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	// )
	new Shortcut("X", "Innovate a lot! (Test for mozilla)", "Innovation"),
	new Shortcut("C", "Compose a new message", "Compose"),

	new Shortcut("E", "Archive", "Archive selected messages"), // doesn't work because no descriptive innerText / outerHTML
	new Shortcut("U", "Back to inbox", "Go back to inbox"), // doesn't work because no descriptive innerText / outerHTML

	new Shortcut("CTRL+Shift+C", "Add Cc recipients", "Add Cc recipients"), // doesn't work because not registered as click. Is suggested when pressing "Link to"
	new Shortcut("CTRL+Shift+B", "Add Bcc recipients", "Add Bcc recipients"), // doesn't work because not registered as click. Is suggested when pressing "Link to"

	new Shortcut("CTRL-Enter", "Send", "Send email"), // doesn't work; not sure why. 'Send' is in innerText and outerHTML
	new Shortcut("K", "Newer", "Jump to newer email"), // doesn't work; not sure why. 'Newer' is in outerHTML
	new Shortcut("J", "Older", "Jump to older email") // doesn't work; not sure why. 'Older' is in outerHTML
	new Shortcut("CTRL-K", "Link to", "Insert a Link"), // doesn't work; not sure why. 'Link to' is in outerHTML
];

const clickHandler = function (event: MouseEvent) {
	console.debug('Click event:', event);
	const innerText: string = event.target.innerText;
	const outerHTML: string = event.target.outerHTML;
	console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);

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
