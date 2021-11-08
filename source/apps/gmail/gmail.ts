require('styled-notifications');

// skips contains part of the outerHTML properties of elements that should NOT display a shortcut when pressed (elements that are not buttons)
const skips = [
	"role=\"toolbar\"", // stop popup from appearing when pressing formatting toolbar
	"aria-label=\"Add Cc recipients ‪(Ctrl-Shift-C)‬\"", // stop popup from appearing when pressing near Cc / Bcc
	"aria-label=\"Add Bcc recipients ‪(Ctrl-Shift-B)‬\"", // stop popup from appearing when pressing near Cc / Bcc
	"<div class=\"z0\"><div class=\"T-I T-I-KE L3\" style=\"user-select: none\" role=\"button\" tabindex=\"0\" jscontroller=\"eIu7Db\" jsaction=\"click:dlrqf; clickmod:dlrqf\" jslog=\"20510; u014N:cOuCgd,Kr2w4b\" gh=\"cm\">Compose</div></div>", // stop popup from appearing when pressing near Compose
	"class=\"D E G-atb\"", // stop popup from appearing when pressing above inbox
	'role="menu"', // stop popup from appearing when pressing menu with indent, quote, etc.
]

import { Shortcut } from '../../shortcut';

document.body.style.border = '5px solid green';

// open a new url in the current window
function openUrl(url: string) {
	window.open(url, '_self');
}

const openSettings = function(event) {
	console.log("settings");
	openUrl("https://mail.google.com/mail/#settings/general");
}

const successNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
	onclick: openSettings,
	closeOnClick: false,
});

const gmailShortcuts: Shortcut[] = [
	// new Shortcut(
	// key: string; // the shortcut key sequence, eg. 'Shift+C'
	// description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	// button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
	// )
	new Shortcut("Ctrl+K", "Insert a link", "submit_as_link"), // difficult; extremely long outerHTML and innerText tags
	new Shortcut("X", "Innovate a lot! (Test for mozilla)", "Innovation"),

	new Shortcut("C", "Compose", "<div class=\"T-I T-I-KE L3\" style=\"user-select: none\" role=\"button\" tabindex=\"0\" jscontroller=\"eIu7Db\" jsaction=\"click:dlrqf; clickmod:dlrqf\" jslog=\"20510; u014N:cOuCgd,Kr2w4b\" gh=\"cm\">Compose</div>"),
	new Shortcut("E", "Archive", "<div class=\"asa\"><div class=\"ar8 T-I-J3 J-J5-Ji\"></div></div>"),
	new Shortcut("#", "Delete", '<div class="asa"><div class="ar9 T-I-J3 J-J5-Ji"></div></div>'),
	new Shortcut("U", "Go back to inbox", "<div class=\"asa\"><div class=\"ar6 T-I-J3 J-J5-Ji\"></div></div>"),
	new Shortcut("Ctrl+Enter", "Send", "<div id=\":14h\" class=\"T-I J-J5-Ji aoO v7 T-I-atl L3\" role=\"button\" tabindex=\"1\" style=\"user-select: none;\" data-tooltip=\"Send ‪(Ctrl-Enter)‬\" aria-label=\"Send ‪(Ctrl-Enter)‬\" data-tooltip-delay=\"800\" jslog=\"32601; u014N:cOuCgd,Kr2w4b; dYFj7e:true; 11:WyIjbXNnLWE6cjEwNTcyMzg2Mzg1Nzc3NjgxMjQiLG51bGwsbnVsbCxudWxsLDEsbnVsbCxbIiN0aHJlYWQtYTpyLTYxMTY2NjY1NzMzMDY1MDU4NTAiLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLFtdXSxmYWxzZSxudWxsLGZhbHNlLGZhbHNlXQ..\">Send</div>"),
	new Shortcut("K", "Jump to newer email", "data-tooltip=\"Newer\">"),
	new Shortcut("J", "Jump to older email", "data-tooltip=\"Older\">"),
	new Shortcut("R", "Reply", "<span id =\":177\" role=\"link\" tabindex=\"0\" class=\"ams bkH\" jslog=\"21576; u014N:cOuCgd,Kr2w4b;\">Reply</span>"),

	new Shortcut("Ctrl+Z", "Undo", "<div class=\"te  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+Y", "Redo", "<div class=\"sV  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+B", "Bold", "<div class=\"eN  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+I", "Italics", "<div class=\"e3  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+U", "Underline", "<div class=\"fu  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+Shift+7", "Numbered list", "<div class=\"e6  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+Shift+8", "Bulleted list", "<div class=\"eO  aaA aaB\"> </div>"),
	new Shortcut("Ctrl+Shift+9", "Quote", '<div class="fa  aaA aaB"> </div>'),
	new Shortcut("Ctrl+[", "Indent less", '<div class="e8  aaA aaB"> </div>'),
	new Shortcut("Ctrl+]", "Indent more", '<div class="e2  aaA aaB"> </div>'),
	new Shortcut("Alt+Shift+5", "Strikethrough", '<div class="td  aaA aaB"> </div>'),
	new Shortcut("Ctrl+\\", "Remove formatting", '<div class="fb  aaA aaB"> </div>'),
	new Shortcut("Ctrl+Shift+L", "Align left", '<div class="e4 aaA aaB"> </div>'),
	new Shortcut("Ctrl+Shift+E", "Align center", '<div class="eP aaA aaB"> </div>'),
	new Shortcut("Ctrl+Shift+R", "Align right", '<div class="fc aaA aaB"> </div>'),

	new Shortcut("Ctrl+Shift+D", "Discard draft", "<div class=\"og T-I-J3\" style=\"user-select: none;\"></div>"),

	new Shortcut("G+K", "Go to tasks", '<div class="aT5-aOt-I-JX-Jw" style="background-image: url(https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png)"></div>'),

	new Shortcut("Ctrl+Shift+C", "Add Cc recipients", "Add Cc recipients"), // doesn't work because not registered as click. Is suggested when pressing "Link to"
	new Shortcut("Ctrl+Shift+B", "Add Bcc recipients", "Add Bcc recipients"), // doesn't work because not registered as click. Is suggested when pressing "Link to"
];

const clickHandler = function (event: MouseEvent) {
	console.debug('Click event:', event);
	const innerText: string = event.target.innerText;
	const outerHTML: string = event.target.outerHTML;
	console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);
	if (skips.some(r => outerHTML.includes(r))) {
		return;
	} else {
		// exceptions. if there are too many of these we need to find a better solution
		if (outerHTML.includes("submit_as_link")) {
			successNotification({
				title: `Press CTRL+K`,
				message: `For "Link to" try pressing "CTRL+K" instead ;-)`,
			});
			return;
		}
		else {
			for (const shortcut of gmailShortcuts) {
				if (innerText === shortcut.description || outerHTML.includes(shortcut.button)) {
					successNotification({
						title: `Press ${shortcut.key}`,
						message: `For "${shortcut.description}" try pressing "${shortcut.key}" instead ;-)`,
					});
					break;
				}
			}
		}
		// changeLanguage(event);
	}
};

document.addEventListener('click', clickHandler, true);

successNotification({
	title: `Enable keyboard shorcuts!`,
	message: `Go to 'Settings' > 'Advanced' > 'Keyboard shortcuts' > Enable`,
	showDuration: 10000,
});

// const changeLanguage = function(event) {
// 	console.log("language");
// 	const languageDropdown = findDropdown("English (US)");
// 	console.debug(languageDropdown)
// }

// // listen for change of the url on the current page
// function listenForUrlChange() {
// 	const currentUrl = window.location.href;
// 	console.log(`Current url: ${currentUrl}`);
// 	chrome.runtime.sendMessage({
// 		type: 'urlChanged',
// 		url: currentUrl,
// 	});
// }

// // find a dropdown element with a specific option
// function findDropdown(value: string): HTMLSelectElement {
// 	const dropdowns = document.getElementsByTagName('select');
// 	for (const dropdown of dropdowns as any) {
// 		const options = dropdown.getElementsByTagName('option');
// 		for (const option of options) {
// 			if (option.value === value) {
// 				return dropdown;
// 			}
// 		}
// 	}
// 	return null;
// }


// // change the value of a dropdown to a specific value
// function changeDropdownValue(dropdown: HTMLSelectElement, value: string) {
// 	const options = dropdown.options;
// 	for (let i = 0; i < options.length; i++) {
// 		if (options[i].value === value) {
// 			dropdown.selectedIndex = i;
// 			break;
// 		}
// 	}
// }

// // check if the url of the current page contains text
// if (window.location.href.includes("settings/general")) {
// 	successNotification({
// 		title: `Change your Language to English US`,
// 		message: `Change your Language to English US`,
// 		showDuration: 10000,
// 		onclick: changeLanguage,
// 	});
// }

// // find span with text "Keyboard Shortcuts"
// const keyboardShortcutsSpan = document.querySelector('span:contains("Keyboard Shortcuts")');
// if (keyboardShortcutsSpan) {
// 	//convert element to HTMLElement
// 	const keyboardShortcutsElement = keyboardShortcutsSpan as HTMLElement;
// 	scrollIntoView(keyboardShortcutsElement);
// }

// //scroll element into view
// function scrollIntoView(element: HTMLElement) {
// 	element.scrollIntoView();
// }
