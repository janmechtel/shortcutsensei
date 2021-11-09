require('styled-notifications');

// skips contains part of the outerHTML properties of elements that should NOT display a popup when pressed (i.e. elements that are not buttons)
const elementsToSkip = [
	"role=\"toolbar\"", // stop popup from appearing when pressing formatting toolbar
	"Input tools on/off (Ctrl-Shift-K)", // stop popup from appearing when pressing menu above email
	"<div class=\"z0\"><div class=\"T-I T-I-KE L3\" style=\"user-select: none\" role=\"button\" tabindex=\"0\" jscontroller=\"eIu7Db\" jsaction=\"click:dlrqf; clickmod:dlrqf\" jslog=\"20510; u014N:cOuCgd,Kr2w4b\" gh=\"cm\">Compose</div></div>", // stop popup from appearing when pressing near Compose
	"class=\"D E G-atb\"", // stop popup from appearing when pressing above inbox
	"class=\"J-Z-I J-J5-Ji\" command=\"+justifyRight\" data-tooltip=\"Align right ‪(Ctrl-Shift-R)‬\" aria-label=\"Align right ‪(Ctrl-Shift-R)‬\"><div class=\"J-J5-Ji J-Z-I-Kv-H\"><div class=\"J-J5-Ji J-Z-I-J6-H\"><div class=\"fc aaA aaB\"> </div></div></div></div></td></tr></tbody></table></div>", // stop popup from appearing when pressing menu with indent, quote, etc.
	"data-tooltip=\"Bulleted list ‪(Ctrl-Shift-8)‬\" aria-label=\"Bulleted list ‪(Ctrl-Shift-8)‬\" aria-pressed=\"false\" role=\"button\" style=\"user-select: none;\"><div class=\"J-J5-Ji J-Z-I-Kv-H\"><div class=\"J-J5-Ji J-Z-I-J6-H\"><div class=\"eO  aaA aaB\"> </div></div></div></div></td></tr></tbody></table></div>", // stop popup from appearing when pressing menu with bulleted list, etc.
	"role=\"tablist\"", // stop popup from appearing when pressing taskbar on right side
	"<div class=\"amn\">", // stop popup from appearing when pressing next to 'Forward' / 'Reply' buttons
	"data-tooltip=\"More options\" aria-label=\"More options\">", // stop popup from appearing when pressing bottom bar of draft email
	"data-tooltip=\"Select\"", // stop'Archive' popup from appearing when opening 'mark as ...' menu
	"target=\"keyboard_shortcuts_help_window\"", // stop popups from appearing when pressing inside keyboard shortcut help menu
]

import { Shortcut } from '../../shortcut';

document.body.style.border = '5px solid yellow';


const openSettings = function (event) {
	console.log("settings");
	openUrl("https://mail.google.com/mail/#settings/general");
}

const successNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
	closeOnClick: true,
});

const settingsNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
	onclick: openSettings,
	closeOnClick: true,
});



const gmailShortcuts: Shortcut[] = [
	// new Shortcut(
	// key: string; // the shortcut key sequence, eg. 'Shift+C'
	// description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	// button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
	// )
	new Shortcut("C", "Compose", "Compose"),

	new Shortcut("E", "Archive", "<div class=\"asa\"><div class=\"ar8 T-I-J3 J-J5-Ji\"></div></div>"),
	new Shortcut("#", "Delete", '<div class="asa"><div class="ar9 T-I-J3 J-J5-Ji"></div></div>'),
	new Shortcut("!", "Mark as spam", "<div class=\"asa\"><div class=\"asl T-I-J3 J-J5-Ji\"></div></div>"),
	new Shortcut("Shift+I", "Mark as read", "Read"),
	new Shortcut("Shift+I", "Mark as read", "bAO T-I-J3 J-J5-Ji"),
	new Shortcut("Shift+U", "Mark as unread", "Unread"),
	new Shortcut("Shift+U", "Mark as unread", "bAP T-I-J3 J-J5-Ji"),
	new Shortcut("=", "Mark as important", "Mark as important"),
	new Shortcut("-", "Mark as not important", "Mark as not important"),
	new Shortcut("L", "Label as", "<div class=\"asa\"><div class=\"asb T-I-J3 J-J5-Ji\"></div></div>"),
	new Shortcut("Shift+T", "Add to tasks", "<div class=\"asa\"><div class=\"Vj T-I-J3 J-J5-Ji\"></div></div>"),
	new Shortcut("M", "Mute conversation", "Mute"),

	new Shortcut("K", "Jump to newer email", "data-tooltip=\"Newer\""),
	new Shortcut("J", "Jump to older email", "data-tooltip=\"Older\""),
	new Shortcut("A", "Reply all", ">Reply all</span>"),
	new Shortcut("R", "Reply", "Reply"),
	new Shortcut("S", "Star/unstar", "class=\"f T-KT-JX\" src=\"images/cleardot.gif"),
	new Shortcut("F", "Forward", "role=\"link\" tabindex=\"0\" class=\"ams bkG\" jslog=\"21578; u014N:cOuCgd,Kr2w4b;\">Forward</span>"),
	new Shortcut("U", "Go back to inbox", "<div class=\"asa\"><div class=\"ar6 T-I-J3 J-J5-Ji\"></div></div>"),

	new Shortcut("Ctrl+Z", "Undo", "<div class=\"te  aaA aaB\""),
	new Shortcut("Ctrl+Y", "Redo", "<div class=\"sV  aaA aaB\""),
	new Shortcut("Ctrl+K", "Insert a link", "submit_as_link"), // difficult; extremely long outerHTML and innerText tags
	new Shortcut("Ctrl+B", "Bold", "<div class=\"eN  aaA aaB\""),
	new Shortcut("Ctrl+I", "Italics", "<div class=\"e3  aaA aaB\""),
	new Shortcut("Ctrl+U", "Underline", "<div class=\"fu  aaA aaB\""),
	new Shortcut("Ctrl+Shift+7", "Numbered list", "<div class=\"e6  aaA aaB\""),
	new Shortcut("Ctrl+Shift+8", "Bulleted list", "<div class=\"eO  aaA aaB\""),
	new Shortcut("Ctrl+Shift+9", "Quote", '<div class="fa  aaA aaB"'),
	new Shortcut("Ctrl+[", "Indent less", '<div class="e8  aaA aaB"'),
	new Shortcut("Ctrl+]", "Indent more", '<div class="e2  aaA aaB"'),
	new Shortcut("Alt+Shift+5", "Strikethrough", '<div class="td  aaA aaB"'),
	new Shortcut("Ctrl+\\", "Remove formatting", '<div class="fb  aaA aaB"'),
	new Shortcut("Ctrl+Shift+L", "Align left", '<div class="e4 aaA aaB"'),
	new Shortcut("Ctrl+Shift+E", "Align center", '<div class="eP aaA aaB"'),
	new Shortcut("Ctrl+Shift+R", "Align right", '<div class="fc aaA aaB"'),

	new Shortcut("Ctrl+Enter", "Send", "Send"),
	new Shortcut("Ctrl+Shift+D", "Discard draft", "<div class=\"og T-I-J3\" style=\"user-select: none;\"></div>"),

	new Shortcut("G+K", "Go to tasks", '<div class="aT5-aOt-I-JX-Jw"'),

	new Shortcut("Ctrl+Shift+C", "Add Cc recipients", "Cc"),
	new Shortcut("Ctrl+Shift+B", "Add Bcc recipients", "Bcc"),
];

const clickHandler = function (event: MouseEvent) {
	console.debug('Click event:', event);
	const innerText: string = event.target.innerText;
	const outerHTML: string = event.target.outerHTML;
	console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);

	if (outerHTML.includes("Then, copy the web address from the box in your browser's address bar, and paste it into the box above.")) {
		successNotification({
			title: `Press CTRL+K`,
			message: `For "Link to" try pressing "CTRL+K" instead ;-)`,
		});
		return;
	} else if (outerHTML.includes("aria-label=\"Undo link\">Undo</span>")) {
		successNotification({
			title: `Press Z`,
			message: `For "Undo last action" try pressing "Z" instead ;-)`,
		});
		return;
	} else {
		if (elementsToSkip.some(skip => outerHTML.includes(skip))) {
			console.debug("Skipped processing the click because it's included in our ignore list something ...");
			console.debug(elementsToSkip.filter(skip => outerHTML.includes(skip)));
			return;
		} else {
			// exceptions. if there are too many of these we need to find a better solution
			for (const shortcut of gmailShortcuts) {
				console.debug(shortcut);
				if (innerText === shortcut.description || outerHTML.includes(shortcut.button)) {
					console.debug("match found");
					successNotification({
						title: `Press ${shortcut.key}`,
						message: `For "${shortcut.description}" try pressing "${shortcut.key}" instead ;-)`,
					});
					break;
				}
			}
		}
	}
};

document.addEventListener('click', clickHandler, true);

// open a new url in the current window
function openUrl(url: string) {
	window.open(url, '_self');
}

document.addEventListener('click', clickHandler, true);

// check if the url of the current page is settings
if (window.location.href.includes("settings/general")) {
	successNotification({
		title: `Change your Language to English US`,
		message: `1. Change your Language to English US & 2. Enable Keyboard Shortcuts`,
		showDuration: 30000,
	});
} else {
	settingsNotification({
		title: `Enable keyboard shorcuts!`,
		message: `Click here  to go to 'Settings'`,
		showDuration: 10000,
	});
}

