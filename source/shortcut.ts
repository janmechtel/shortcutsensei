export class Shortcut {
	key: string; // the shortcut key sequence, eg. 'Shift+C'
	description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	innerText: string; // the text content, eg. 'Compose'
	outerHTMLPart: string; // a word that will be matched with the OuterHTML, eg. 'xy' will be matched within "<div class='xy'>Compose</div>"

	constructor(shortcut: string, description: string, innerText?: string, outerHTMLPart?: string) {
		this.key = shortcut;
		this.description = description;
		this.innerText = innerText;
		this.outerHTMLPart = outerHTMLPart;
	}
}
