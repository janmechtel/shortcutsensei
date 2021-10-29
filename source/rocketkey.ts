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
	// description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	// button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
	// )
	new Shortcut("X", "Innovate a lot! (Test for mozilla)", "Innovation"),
	new Shortcut("C", "Compose", "<div class=\"T-I T-I-KE L3\" style=\"user-select: none\" role=\"button\" tabindex=\"0\" jscontroller=\"eIu7Db\" jsaction=\"click:dlrqf; clickmod:dlrqf\" jslog=\"20510; u014N:cOuCgd,Kr2w4b\" gh=\"cm\">Compose</div>"),
	new Shortcut("E", "Archive", "<div class=\"asa\"><div class=\"ar8 T-I-J3 J-J5-Ji\"></div></div>"),
	new Shortcut("U", "Go back to inbox", "<div class=\"asa\"><div class=\"ar6 T-I-J3 J-J5-Ji\"></div></div>"), // doesn't work because no descriptive innerText / outerHTML
	new Shortcut("CTRL+Shift+C", "Add Cc recipients", "Add Cc recipients"), // doesn't work because not registered as click. Is suggested when pressing "Link to"
	new Shortcut("CTRL+Shift+B", "Add Bcc recipients", "Add Bcc recipients"), // doesn't work because not registered as click. Is suggested when pressing "Link to"
	new Shortcut("CTRL+Enter", "Send email", "<div id=\":14h\" class=\"T-I J-J5-Ji aoO v7 T-I-atl L3\" role=\"button\" tabindex=\"1\" style=\"user-select: none;\" data-tooltip=\"Send ‪(Ctrl-Enter)‬\" aria-label=\"Send ‪(Ctrl-Enter)‬\" data-tooltip-delay=\"800\" jslog=\"32601; u014N:cOuCgd,Kr2w4b; dYFj7e:true; 11:WyIjbXNnLWE6cjEwNTcyMzg2Mzg1Nzc3NjgxMjQiLG51bGwsbnVsbCxudWxsLDEsbnVsbCxbIiN0aHJlYWQtYTpyLTYxMTY2NjY1NzMzMDY1MDU4NTAiLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLFtdXSxmYWxzZSxudWxsLGZhbHNlLGZhbHNlXQ..\">Send</div>"),
	new Shortcut("K", "Jump to newer email", "Newer"), // doesn't work; not sure why. 'Newer' is in outerHTML
	new Shortcut("J", "Jump to older email", "Older"), // doesn't work; not sure why. 'Older' is in outerHTML
	new Shortcut("CTRL+K", "Insert a link", "Link to") // doesn't work; not sure why. 'Link to' is in outerHTML
];

const clickHandler = function (event: MouseEvent) {
	console.debug('Click event:', event);
	const innerText: string = event.target.innerText;
	const outerHTML: string = event.target.outerHTML;
	console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);

	for (const shortcut of gmailShortcuts) {
		if (innerText === shortcut.button || outerHTML === shortcut.button) {
			successNotification({
				title: `Press ${shortcut.key}`,
				message: `For "${shortcut.description}" try pressing "${shortcut.key}" instead ;-)`,
			});
			break;
		}
	}
};

document.addEventListener('click', clickHandler)
