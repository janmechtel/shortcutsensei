import alertify = require('alertifyjs');

import optionsStorage from '../../options/options-storage';

//TODO: check that onboarding is still working
//TODO: align design
//TODO: hookup buttons

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
import { Options } from 'webext-options-sync';

let snoozeUntil = 0;
let options: Options;

//helpful for debugging, change the color to check if you most recent code is loaded
//document.body.style.border = '5px solid red';

// open a new url in the current window
function openUrl(url: string) {
	document.location.href = url;
}

const gmailShortcuts: Shortcut[] = [
	// new Shortcut(
	// id: number; // the unique id of the shortcut (unique per application)
	// key: string; // the shortcut key sequence, eg. 'Shift+C'
	// description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	// button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
	// )
	new Shortcut(1, "Ctrl+K", "Link to", "", "hidden;\">Invalid email address", 0, 10000),

	new Shortcut(2, "C", "Compose", "Compose", "aria-label=\"Compose an email\""),
	new Shortcut(3, "Z", "Undo last action", "", "aria-label=\"Undo link\">Undo</span>"),
	new Shortcut(4, "Z", "Undo last action", "", "id=\"link_undo"), // had to add this one twice, because outerHTML is completely different when you undo sending an email

	new Shortcut(5, "E", "Archive", "", "class=\"ar8 T-I-J3 J-J5-Ji"),
	new Shortcut(6, "#", "Delete", "", "class=\"ar9 T-I-J3 J-J5-Ji"),
	new Shortcut(7, "!", "Mark as spam", "", "class=\"asl T-I-J3 J-J5-Ji"),
	new Shortcut(8, "Shift+I", "Mark as read", "", "bAO T-I-J3 J-J5-Ji"),
	new Shortcut(9, "Shift+U", "Mark as unread", "", "bAP T-I-J3 J-J5-Ji"),
	new Shortcut(10, "=", "Mark as important", "Mark as important", ""),
	new Shortcut(11, "-", "Mark as not important", "Mark as not important", ""),
	new Shortcut(12, "L", "Label as", "", "class=\"asb T-I-J3 J-J5-Ji"),
	new Shortcut(13, "Shift+T", "Add to tasks", "", "class=\"Vj T-I-J3 J-J5-Ji"),
	new Shortcut(14, "M", "Mute conversation", "Mute", ""),

	new Shortcut(15, "K", "Jump to newer email", "", "data-tooltip=\"Newer\""),
	new Shortcut(16, "J", "Jump to older email", "", "class=\"T-I J-J5-Ji adg"),
	new Shortcut(17, "A", "Reply all", "", ">Reply all</span>"),
	new Shortcut(18, "R", "Reply", "Reply", "data-tooltip=\"Reply\""),
	new Shortcut(19, "S", "Star/unstar", "", "class=\"f T-KT-JX\" src=\"images/cleardot.gif"),
	new Shortcut(20, "F", "Forward", "Forward", ""),
	new Shortcut(21, "U", "Go back to inbox", "", "class=\"ar6 T-I-J3 J-J5-Ji"),

	new Shortcut(22, "CTRL+Shift+C", "Add Cc recipients", "Cc", ""),
	new Shortcut(23, "CTRL+Shift+B", "Add Bcc recipients", "Bcc", ""),

	new Shortcut(24, "Ctrl+Z", "Undo", "", "<div class=\"te  aaA aaB", 200),
	new Shortcut(25, "Ctrl+Y", "Redo", "", "<div class=\"sV  aaA aaB", 200),
	new Shortcut(26, "Ctrl+B", "Bold", "", "<div class=\"eN  aaA aaB\"", 200),
	new Shortcut(27, "Ctrl+I", "Italics", "", "<div class=\"e3  aaA aaB\"", 200),
	new Shortcut(28, "Ctrl+U", "Underline", "", "<div class=\"fu  aaA aaB\"", 200),
	new Shortcut(29, "Ctrl+Shift+7", "Numbered list", "", "<div class=\"e6  aaA aaB\"", 200),
	new Shortcut(30, "Ctrl+Shift+8", "Bulleted list", "", "<div class=\"eO  aaA aaB\"", 200),
	new Shortcut(31, "Ctrl+Shift+9", "Quote", "", '<div class="fa  aaA aaB"'),
	new Shortcut(32, "Ctrl+[", "Indent less", "", '<div class="e8  aaA aaB"'),
	new Shortcut(33, "Ctrl+]", "Indent more", "", '<div class="e2  aaA aaB"'),
	new Shortcut(34, "Alt+Shift+5", "Strikethrough", "", '<div class="td  aaA aaB"'),
	new Shortcut(35, "Ctrl+\\", "Remove formatting", "", '<div class="fb  aaA aaB"'),
	new Shortcut(36, "Ctrl+Shift+L", "Align left", "", '<div class="e4 aaA aaB"'),
	new Shortcut(37, "Ctrl+Shift+E", "Align center", "", '<div class="eP aaA aaB"'),
	new Shortcut(38, "Ctrl+Shift+R", "Align right", "", '<div class="fc aaA aaB"'),

	new Shortcut(39, "Ctrl+Enter", "Send", "Send", ""),
	new Shortcut(40, "Ctrl+Shift+D", "Discard draft", "", "<div class=\"og T-I-J3", 200),

	new Shortcut(41, "G+K", "Go to tasks", "", '<div class="aT5-aOt-I-JX-Jw"'),
];

// check if gmailShortcuts contains duplicate ids
const gmailShortcutsDuplicateIds: Shortcut[] = gmailShortcuts.filter(
	(shortcut: Shortcut) => gmailShortcuts.filter((shortcut2: Shortcut) => shortcut.id === shortcut2.id).length > 1
);

if (gmailShortcutsDuplicateIds.length > 0) {
	console.error("Gmail shortcuts have duplicate ids:", gmailShortcutsDuplicateIds);
	throw new Error("Gmail shortcuts have duplicate ids");
}

async function reloadOptions() {
	options = await optionsStorage.getAll();
	console.debug(options);
	if (options.snoozeUntil !== undefined) {
		snoozeUntil = options.snoozeUntil as number;
	}
}

//listen to chrome storage changes as a proxy to option changes (I couldn't get chrome.runtime.sendMessage to work)
chrome.storage.onChanged.addListener(function (changes, namespace) {
	console.log(changes, namespace);
	if(namespace === 'sync') {
		reloadOptions();
	}
});

let currentShortcut;

const clickHandler = function (event: MouseEvent) {

	//convert timestamp to readable date and time

	if (snoozeUntil != 0 && new Date().getTime() < snoozeUntil) {
		console.log("Skipping further processing. Snoozing until " + new Date(snoozeUntil).toLocaleString());
		console.log(snoozeUntil);
		return;
	}

	console.debug('Click event:', event);
	const innerText: string = event.target.innerText;
	const outerHTML: string = event.target.outerHTML;
	// console.log(`You clicked on: '${innerText}' (innerText)`);
	console.log(`You clicked on: '${outerHTML}' (outerHTML)`);

	if (outerHTML === "<button class=\"ajs-button ajs-ok\"></button>"){
		/*
		Snooze all notifications for 24 hours
		*/
		optionsStorage.set({ snoozeUntil: new Date().getTime() + 60 * 60 * 24 * 1000 });
		return;
	} if (outerHTML === "<button class=\"ajs-button ajs-cancel\"></button>"){
		// don't show this shortcut again
		optionsStorage.set({ ignoredShortcuts: options.ignoredShortcuts + `,${currentShortcut.id}` }); 
	}

	if (outerHTML.length < 10000 && elementsToSkip.some(skip => outerHTML.includes(skip))) {
		console.debug("Skipped processing the click because it's included in our ignore list something ...");
		console.debug(elementsToSkip.filter(skip => outerHTML.includes(skip)));
		return;
	} else {
		for (const shortcut of gmailShortcuts) {
			// console.debug(shortcut);
			if (innerText === shortcut.innerText && innerText !== "") {
				console.debug("match found in InnerText");
				triggerNotification(shortcut);
				currentShortcut = shortcut;
				return;
			}
		}
		for (const shortcut of gmailShortcuts) {
			//console.debug(shortcut);
			if (outerHTML.includes(shortcut.outerHTMLPart) && outerHTML !== "" && shortcut.outerHTMLPart !== "") {
				if ((shortcut.outerHTMLMaxLength === undefined || outerHTML.length < shortcut.outerHTMLMaxLength) && (shortcut.outerHTMLMinLength === undefined || outerHTML.length > shortcut.outerHTMLMinLength)) {
					console.debug("match found in outerHTML and minlength respected");
					triggerNotification(shortcut);
					currentShortcut = shortcut;
					return;
				}
			}
		}
	}
};

document.addEventListener('click', clickHandler, true);

function triggerNotification(shortcut: Shortcut) {
	if (options.gmailOnboardingState as GmailOnboardingState != GmailOnboardingState.Completed) {
		optionsStorage.set({ gmailOnboardingState: GmailOnboardingState.Completed });
	}

	const ignoredShortcutsString = options.ignoredShortcuts as string;
	const ignoredShortcuts = ignoredShortcutsString.split(",").map(Number);
	console.debug(`Is Shortcut ${shortcut.id} contained in ${ignoredShortcuts}`);
	if (!ignoredShortcuts.includes(shortcut.id)) {
		showKeyPopup(`For ${shortcut.description}, press ${shortcut.key}`, "");
	} else {
		console.debug(`Shortcut ${shortcut.key} is ignored because it's contained in ${ignoredShortcuts}`);
	}
}

async function continueOnboardingAfterSettingsLoaded(options: Options) {
	const onboardingAttempts = options.gmailOnboardingAttempts as number;

	//redirect to settings if not there already
	if (!window.location.href.includes("settings/general")) {
		await optionsStorage.set({ gmailOnboardingAttempts: (+onboardingAttempts + 1) as number });
		openUrl("https://mail.google.com/mail/#settings/general");
		return;
	}

	//delay execution of function until gmail is fully loaded
	const dropdowns = Array.from(document.querySelectorAll("select"));


	//find the dropdowns that have a certain display text option
	const languageDropdown = dropdowns?.find(dropdown => dropdown.innerText.includes("English (US)"));
	if (languageDropdown === undefined) {
		console.warn("Could not find the language dropdown, probably Gmail is not done loading yet, waiting 500ms", dropdowns);
		setTimeout(() => { continueOnboardingAfterSettingsLoaded(options); }, 500);
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
		showPopUp(`English (US) Language`, `Please choose "English (US)" as your Display Language`, 0)
		languageDropdown.style.backgroundColor = "yellow";
		languageDropdown.scrollIntoView();
		setTimeout(() => { continueOnboardingAfterSettingsLoaded(options); }, 5000);
	} else if (!saveButton.disabled && !keyboardShortcutsOnInput.checked) {
		showPopUp(`Press Save`, `Click "Save Changes"`, 0)
		saveButton.closest("tr").style.backgroundColor = "yellow";
		saveButton.scrollIntoView();
	} else if (!keyboardShortcutsOnInput.checked) {
		showPopUp(`Set Keyboard Shortcuts to On`, `Click "Keyboard shortcuts on"`, 0)
		keyboardShortcutsOnLabel.closest("tr").style.backgroundColor = "yellow";
		keyboardShortcutsOnLabel.scrollIntoView();
		//setTimeout(() => { continueOnboardingAfterSettingsLoaded(options); }, 5000);
	} else if (!saveButton.disabled && keyboardShortcutsOnInput?.checked) {
		showPopUp(`Press Save`, `Click "Save Changes"`, 0)
		saveButton.closest("tr").style.backgroundColor = "yellow";
		saveButton.scrollIntoView();
	} else {
		optionsStorage.set({ gmailOnboardingCompleted: true });
		optionsStorage.set({ gmailOnboardingState: "SettingsCompleted" });
		showPopUp(`Onboarding completed`, `Onboarding completed! Redirecting to Inbox ...`, 0);
		setTimeout(function () { openUrl("https://mail.google.com/mail") }, 5000);
	}
}

enum GmailOnboardingState {
	NotStarted = "",
	SettingsStarted = "SettingsStarted",
	SettingsCompleted = "SettingsCompleted",
	Completed = "Completed",
	Disabled = "Disabled",
}

async function main() {

	const options = await optionsStorage.getAll();
	console.debug(options);
	if (options.snoozeUntil !== undefined) {
		snoozeUntil = options.snoozeUntil as number;
	}
	const onboardingState = options.gmailOnboardingState as GmailOnboardingState
	const onboardingAttempts = options.gmailOnboardingAttempts as number;
	const maxAttempts = 3;

	switch (onboardingState) {
		case GmailOnboardingState.SettingsStarted:
			if (+onboardingAttempts <= +maxAttempts) {
				continueOnboardingAfterSettingsLoaded(options);
			} else {
				console.debug(`Onboarding disabled, showing 'what now' notification`);
				showPopUp(`Onboarding failed`, `Onboarding failed: we forwarded you to settings ${maxAttempts} times. We are stopping now.`, 0);
				optionsStorage.set({ gmailOnboardingState: GmailOnboardingState.Disabled });
			}
			return;
		case GmailOnboardingState.NotStarted:
			await optionsStorage.set({ gmailOnboardingState: GmailOnboardingState.SettingsStarted });
			await optionsStorage.set({ gmailOnboardingAttempts: 1 });
			continueOnboardingAfterSettingsLoaded(options);
			return;
		case GmailOnboardingState.SettingsCompleted:
			console.debug(`Settings completed, showing 'what now' notification`);
			showPopUp(`Click 'Compose'`, `Try Shortcut Sensei: click 'Compose' to create a new message and see what happens!`, 5000);
			optionsStorage.set({ gmailOnboardingState: GmailOnboardingState.Completed });
			return;
		case GmailOnboardingState.Completed:
			console.debug("Onboarding completed, skipping Onboarding");
			return;
		case GmailOnboardingState.Disabled:
			console.debug("Onboarding is disabled, skipping Onboarding");
			return;
		default:
			console.error(onboardingState);
			console.error("Unknown gmail onboarding state. This should not happen ;)");
			return;
	}
}

main();
reloadOptions();

//call function when url is changing without page reload
window.addEventListener('popstate', function () {
	main();
})

alertify.dialog('showShortcut',function(){
	return{
	main:function(title, message){
		this.setHeader(title);
		this.setContent(message);
	},
	setup:function(){
		return {
			buttons:[{text: "", className: alertify.defaults.theme.ok }, // snooze for 24 hours
			{text: "", className: alertify.defaults.theme.cancel}], // don't show again
			options:{
				modal: false,
				maximizable: false,
				closableByDimmer: true,
				pinnable: false,
				transition: "flipx",
			},
		};
	},
	callback:function(closeEvent){
		
		//The closeEvent has the following properties
		//
		// index: The index of the button triggering the event.
		// button: The button definition object.
		// cancel: When set true, prevent the dialog from closing.
		}
}});

alertify.dialog('showPopUp',function(){
	return{
	main:function(title, message){
		this.setHeader(title);
		this.setContent(message);
	},
	setup:function(){
		return {
			options:{
				modal: false,
				maximizable: false,
				closableByDimmFer: true,
				pinnable: false,
			},
		};
	}
}}); 

alertify.set('notifier','position', 'bottom-left');

function showPopUp(title: string, message: string, duration: number) {
	alertify.notify(message);
}

function showKeyPopup(title: string, message: string, duration = 4000) {
	alertify.showShortcut(title, message, duration);
	// prevents popup from closing too quickly due to setTimeout()
	const highestId = window.setTimeout(() => {
		for (let i = highestId; i >= 0; i--) {
				window.clearInterval(i);
		}
		}, 0);
	if (duration !== 0) {
		setTimeout(() => {
			alertify.showShortcut().close();
		}, duration);
	}
}

// .ajs-close
document.addEventListener("keydown", function(event){
	if (event.shiftKey && event.altKey && event.code === "Comma"){
		console.log("Shift-Alt-,: Close popup");
		for(let i = 0; i < document.querySelectorAll(".ajs-close").length; i++){
			document.querySelectorAll(".ajs-close")[i].click();
		}
	} else if (event.shiftKey === true && event.code === "Period"){
		console.log("Shift-Alt-.: Snooze for 24 hours");
		for(let i = 0; i < document.querySelectorAll(".ajs-ok").length; i++){
			document.querySelectorAll(".ajs-ok")[i].click();
		}
	} else if (event.shiftKey === true && event.code === "Quote"){
		console.log("Shift-Alt-': Don't show again");
		for(let i = 0; i < document.querySelectorAll(".ajs-cancel").length; i++){
			document.querySelectorAll(".ajs-cancel")[i].click();
		}
	}
})