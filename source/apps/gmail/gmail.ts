require('styled-notifications');
import optionsStorage from '../../options/options-storage';
import { showPopUp, showKeyPopup } from '../../styled-notifications';


// contains part of the outerHTML properties of elements that should NOT display a popup when pressed (i.e. elements that are not buttons)
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
	"data-tooltip=\"Select\"", // stop 'Archive' popup from appearing when opening 'mark as ...' menu
	"target=\"keyboard_shortcuts_help_window\"", // stop popups from appearing when pressing inside keyboard shortcut help menu
	"data-hovercard-id", // stop 'Star/unstar' popup from appearing when pressing above 'Reply' box
	"aria-label=\"Some recipients use services that don't support encryption (click for details)", // stop Cc popup from appearing when pressing around Bcc box
]

import { Shortcut } from '../../shortcut';

//helpful for debugging, change the color to check if you most recent code is loaded
//document.body.style.border = '5px solid red';

// open a new url in the current window
function openUrl(url: string) {
	document.location.href = url;
}

const gmailShortcuts: Shortcut[] = [
	// new Shortcut(
	// key: string; // the shortcut key sequence, eg. 'Shift+C'
	// description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	// button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
	// )
	new Shortcut("C", "Compose", "Compose", "class=\"T-I T-I-KE L3"),
	new Shortcut("Z", "Undo last action", "", "aria-label=\"Undo link\">Undo</span>"),
	new Shortcut("Z", "Undo last action", "", "id=\"link_undo"), // had to add this one twice, because outerHTML is completely different when you undo sending an email

	new Shortcut("E", "Archive", "", "class=\"ar8 T-I-J3 J-J5-Ji"),
	new Shortcut("#", "Delete", "", "class=\"ar9 T-I-J3 J-J5-Ji"),
	new Shortcut("!", "Mark as spam", "", "class=\"asl T-I-J3 J-J5-Ji"),
	new Shortcut("Shift+I", "Mark as read", "", "bAO T-I-J3 J-J5-Ji"),
	new Shortcut("Shift+U", "Mark as unread", "", "bAP T-I-J3 J-J5-Ji"),
	new Shortcut("=", "Mark as important", "Mark as important"),
	new Shortcut("-", "Mark as not important", "Mark as not important"),
	new Shortcut("L", "Label as", "", "class=\"asb T-I-J3 J-J5-Ji"),
	new Shortcut("Shift+T", "Add to tasks", "", "class=\"Vj T-I-J3 J-J5-Ji"),
	new Shortcut("M", "Mute conversation", "Mute"),

	new Shortcut("K", "Jump to newer email", "", "data-tooltip=\"Newer\""),
	new Shortcut("J", "Jump to older email", "", "data-tooltip=\"Older\""),
	new Shortcut("A", "Reply all", "", ">Reply all</span>"),
	new Shortcut("R", "Reply", "Reply", "data-tooltip=\"Reply\""),
	new Shortcut("S", "Star/unstar", "", "class=\"f T-KT-JX\" src=\"images/cleardot.gif"),
	new Shortcut("F", "Forward", "Forward"),
	new Shortcut("U", "Go back to inbox", "", "class=\"ar6 T-I-J3 J-J5-Ji"),

	new Shortcut("CTRL+Shift+C", "Add Cc recipients", "Cc"),
	new Shortcut("CTRL+Shift+B", "Add Bcc recipients", "Bcc"),

	new Shortcut("Ctrl+Z", "Undo", "", "<div class=\"te  aaA aaB"),
	new Shortcut("Ctrl+Y", "Redo", "", "<div class=\"sV  aaA aaB"),
	new Shortcut("Ctrl+B", "Bold", "", "<div class=\"eN  aaA aaB\""),
	new Shortcut("Ctrl+I", "Italics", "", "<div class=\"e3  aaA aaB\""),
	new Shortcut("Ctrl+U", "Underline", "", "<div class=\"fu  aaA aaB\""),
	new Shortcut("Ctrl+Shift+7", "Numbered list", "", "<div class=\"e6  aaA aaB\""),
	new Shortcut("Ctrl+Shift+8", "Bulleted list", "", "<div class=\"eO  aaA aaB\""),
	new Shortcut("Ctrl+Shift+9", "Quote", "", '<div class="fa  aaA aaB"'),
	new Shortcut("Ctrl+[", "Indent less", "", '<div class="e8  aaA aaB"'),
	new Shortcut("Ctrl+]", "Indent more", "", '<div class="e2  aaA aaB"'),
	new Shortcut("Alt+Shift+5", "Strikethrough", "", '<div class="td  aaA aaB"'),
	new Shortcut("Ctrl+\\", "Remove formatting", "", '<div class="fb  aaA aaB"'),
	new Shortcut("Ctrl+Shift+L", "Align left", "", '<div class="e4 aaA aaB"'),
	new Shortcut("Ctrl+Shift+E", "Align center", "", '<div class="eP aaA aaB"'),
	new Shortcut("Ctrl+Shift+R", "Align right", "", '<div class="fc aaA aaB"'),

	new Shortcut("Ctrl+Enter", "Send", "Send"),
	new Shortcut("Ctrl+Shift+D", "Discard draft", "", "<div class=\"og T-I-J3"),

	new Shortcut("G+K", "Go to tasks", "", '<div class="aT5-aOt-I-JX-Jw"'),

	new Shortcut("Ctrl+Shift+C", "Add Cc recipients", "Cc"),
	new Shortcut("Ctrl+Shift+B", "Add Bcc recipients", "Bcc"),
];

const clickHandler = function (event: MouseEvent) {
	console.debug('Click event:', event);
	const innerText: string = event.target.innerText;
	const outerHTML: string = event.target.outerHTML;
	console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);

	//TODO: this should go elsewhere into the normal list from above!
	if (outerHTML.includes("hidden;\">Invalid email address") && outerHTML.length > 10000) {
		showKeyPopup(`CTRL+K`, `Link to`);
		return;
	} else {
		if (elementsToSkip.some(skip => outerHTML.includes(skip))) {
			console.debug("Skipped processing the click because it's included in our ignore list something ...");
			console.debug(elementsToSkip.filter(skip => outerHTML.includes(skip)));
			return;
		} else {
			for (const shortcut of gmailShortcuts) {
				// console.debug(shortcut);
				if (innerText === shortcut.innerText && innerText !== "") {
					console.debug("match found in InnerText");
					showKeyPopup(shortcut.key, shortcut.description);
					return;
				}
			}
			for (const shortcut of gmailShortcuts) {
				//console.debug(shortcut);
				if (outerHTML.includes(shortcut.outerHTMLPart) && outerHTML !== "") {
					console.debug("match found in outerHTML");
					showKeyPopup(shortcut.key, shortcut.description);
					return;
				}
			}
		}
	}
};

document.addEventListener('click', clickHandler, true);

function continueOnboardingAfterSettingsLoaded() {

	//delay execution of function until gmail is fully loaded
	const dropdowns = Array.from(document.querySelectorAll("select"));


	//find the dropdowns that have a certain display text option
	const languageDropdown = dropdowns?.find(dropdown => dropdown.innerText.includes("English (US)"));
	if (languageDropdown === undefined) {
		console.warn("Could not find the language dropdown, probably Gmail is not done loading yet, waiting 500ms", dropdowns);
		setTimeout(continueOnboardingAfterSettingsLoaded, 500);
		return;
	}
	console.debug("Gmail is loaded, continuing with onboarding ...");

	const language = languageDropdown?.options[languageDropdown?.selectedIndex].text;
	console.debug(language);

	//select a button element with a certain HTML property
	const saveButton = document.querySelector("button[guidedhelpid='save_changes_button']");
	//check if the saveButton is enabled
	if (saveButton === undefined) {
		console.debug("Could not find the save button");
	}

	//find labels element that contains certain text
	const keyboardShortcutsOnLabel = Array.from(document.querySelectorAll("label"))?.find(label => label.innerText == 'Keyboard shortcuts on');
	if (keyboardShortcutsOnLabel === undefined) {
		console.debug("Could not find the keyboard shortcuts on label");
	}

	const keyboardShortcutsOnInput = keyboardShortcutsOnLabel?.closest("tr")?.querySelector("input");
	if (keyboardShortcutsOnInput === undefined) {
		console.debug("Could not find the keyboard shortcuts on input");
	}

	if (language !== "English (US)") {
		showPopUp(`English (US) Language`, `Choose "English (US)" as Display Language please.`, 500)
		languageDropdown.style.backgroundColor = "yellow";
		languageDropdown.scrollIntoView();
		setTimeout(continueOnboardingAfterSettingsLoaded, 500);
	} else if (!saveButton.disabled && !keyboardShortcutsOnInput?.checked) {
		showPopUp(`Press Save`, `CLick "Save Changes"`, 0)
		saveButton.closest("tr").style.backgroundColor = "yellow";
		saveButton.scrollIntoView();
	} else if (!keyboardShortcutsOnInput?.checked) {
		showPopUp(`Set Keyboard Shortcuts to On`, `CLick "Keyboard shortcuts on"`, 500)
		keyboardShortcutsOnLabel.closest("tr").style.backgroundColor = "yellow";
		keyboardShortcutsOnLabel.scrollIntoView();
		setTimeout(continueOnboardingAfterSettingsLoaded, 500);
	} else if (!saveButton.disabled && keyboardShortcutsOnInput?.checked) {
		showPopUp(`Press Save`, `Click "Save Changes"`, 0)
		saveButton.closest("tr").style.backgroundColor = "yellow";
		saveButton.scrollIntoView();
	} else {
		optionsStorage.set({ gmailOnboardingCompleted: true });
		showPopUp(`Onboarding completed`, `Redirecting to Inbox ...`, 0, `success`);
		setTimeout(function () { openUrl("https://mail.google.com/mail") }, 5000);
	}
}

async function main() {

	const options = await optionsStorage.getAll();
	console.debug(options);

	const onBoardingCompleted = options.gmailOnboardingCompleted;
	if (onBoardingCompleted) {
		console.debug("Onboarding completed, skipping Onboarding");
		return;
	} else {
		if (!window.location.href.includes("settings/general")) {
			openUrl("https://mail.google.com/mail/#settings/general");
		} else {
			continueOnboardingAfterSettingsLoaded();
		}
	}
}

main();

//call function when url is changing without page reload
window.addEventListener('popstate', function () {
	main();
})
