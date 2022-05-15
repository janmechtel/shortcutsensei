import alertify = require('alertifyjs');

import optionsStorage from '../../options/options-storage';

const elementsToSkip = [

]

import { Shortcut } from '../../shortcut';
import { Options } from 'webext-options-sync';

let snoozeUntil = 0;
let options: Options;

const colabShortcuts: Shortcut[] = [
	// new Shortcut(
	// id: number; // the unique id of the shortcut (unique per application)
	// key: string; // the shortcut key sequence, eg. 'Shift+C'
	// description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	// innerText: string; // the text content, eg. 'Compose'
	// outerHTMLPart: string; // a word that will be matched with the OuterHTML, eg. 'xy' will be matched within "<div class='xy'>Compose</div>"
	// outerHTMLMaxLength: number;
	// outerHTMLMinLength: number; // the minimum length of the outerHTML, for example '10000' if the match should only apply for really long outerHTML. This is done for the Linkto shortcut in Gmail.
	// )
	new Shortcut(1, "CTRL+M+B", "New cell below", "Code", "command=\"insert-cell-below\""),
	new Shortcut(2, "CTRL+M+D", "Delete cell", "", "command=\"delete-cell-or-selection\"")
];

const colabShortcutsDuplicateIds: Shortcut[] = colabShortcuts.filter(
	(shortcut: Shortcut) => colabShortcuts.filter((shortcut2: Shortcut) => shortcut.id === shortcut2.id).length > 1
);

if (colabShortcutsDuplicateIds.length > 0) {
	console.error("Colab shortcuts have duplicate ids:", colabShortcutsDuplicateIds);
	throw new Error("Colab shortcuts have duplicate ids");
}

async function reloadOptions() {
	options = await optionsStorage.getAll();
	console.debug(options);
	if (options.snoozeUntil !== undefined) {
		snoozeUntil = options.snoozeUntil as number;
	}
}

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
		for (const shortcut of Shortcuts) {
			// console.debug(shortcut);
			if (innerText === shortcut.innerText && innerText !== "") {
				console.debug("match found in InnerText");
				triggerNotification(shortcut);
				currentShortcut = shortcut;
				return;
			}
		}
		for (const shortcut of colabShortcuts) {
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
	const ignoredShortcutsString = options.ignoredShortcuts as string;
	const ignoredShortcuts = ignoredShortcutsString.split(",").map(Number);
	console.debug(`Is Shortcut ${shortcut.id} contained in ${ignoredShortcuts}`);
	if (!ignoredShortcuts.includes(shortcut.id)) {
		showKeyPopup(`For ${shortcut.description}, press ${shortcut.key}`, "");
	} else {
		console.debug(`Shortcut ${shortcut.key} is ignored because it's contained in ${ignoredShortcuts}`);
	}
}

alertify.dialog('showShortcut',function(){
	return{
	main:function(title, message){
		alertify.showPopUp().close();
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
	alertify.showPopUp(title, message, duration);
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
