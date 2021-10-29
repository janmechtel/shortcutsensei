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
	new Shortcut("U", "Go back to inbox", "<div class=\"asa\"><div class=\"ar6 T-I-J3 J-J5-Ji\"></div></div>"),
	new Shortcut("Ctrl+Enter", "Send", "<div id=\":14h\" class=\"T-I J-J5-Ji aoO v7 T-I-atl L3\" role=\"button\" tabindex=\"1\" style=\"user-select: none;\" data-tooltip=\"Send ‪(Ctrl-Enter)‬\" aria-label=\"Send ‪(Ctrl-Enter)‬\" data-tooltip-delay=\"800\" jslog=\"32601; u014N:cOuCgd,Kr2w4b; dYFj7e:true; 11:WyIjbXNnLWE6cjEwNTcyMzg2Mzg1Nzc3NjgxMjQiLG51bGwsbnVsbCxudWxsLDEsbnVsbCxbIiN0aHJlYWQtYTpyLTYxMTY2NjY1NzMzMDY1MDU4NTAiLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLFtdXSxmYWxzZSxudWxsLGZhbHNlLGZhbHNlXQ..\">Send</div>"),
	new Shortcut("K", "Jump to newer email", "data-tooltip=\"Newer\">"),
	new Shortcut("J", "Jump to older email", "data-tooltip=\"Older\">"),
	new Shortcut("R", "Reply", "<span id =\":177\" role=\"link\" tabindex=\"0\" class=\"ams bkH\" jslog=\"21576; u014N:cOuCgd,Kr2w4b;\">Reply</span>"),
	new Shortcut("Ctrl+B", "Bold", "<div class=\"eN  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+I", "Italics", "<div class=\"e3  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+U", "Underline", "<div class=\"fu  aaA aaB\"> </div>"),

	new Shortcut("Ctrl+K", "Insert a link", "To what URL should this link go?"), // difficult; extremely long outerHTML and innerText tags
	new Shortcut("Ctrl+Shift+C", "Add Cc recipients", "Add Cc recipients"), // doesn't work because not registered as click. Is suggested when pressing "Link to"
	new Shortcut("Ctrl+Shift+B", "Add Bcc recipients", "Add Bcc recipients") // doesn't work because not registered as click. Is suggested when pressing "Link to"
];

const clickHandler = function (event: MouseEvent) {
	console.debug('Click event:', event);
	const innerText: string = event.target.innerText;
	const outerHTML: string = event.target.outerHTML;
	console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);

	for (const shortcut of gmailShortcuts) {
		if (innerText === shortcut.description || outerHTML.includes(shortcut.button)) {
			successNotification({
				title: `Press ${shortcut.key}`,
				message: `For "${shortcut.description}" try pressing "${shortcut.key}" instead ;-)`,
			});
			break;
		}
	}
};

document.addEventListener('click', clickHandler)
