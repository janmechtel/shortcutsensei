export class Shortcut {
	id: number; // the unique id of the shortcut (unique per application)
	key: string; // the shortcut key sequence, eg. 'Shift+C'
	description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	innerText: string; // the text content, eg. 'Compose'
	outerHTMLPart: string; // a word that will be matched with the OuterHTML, eg. 'xy' will be matched within "<div class='xy'>Compose</div>"
	outerHTMLMinLength: number; // the minimum length of the outerHTML, for example '10000' if the match should only apply for really long outerHTML. This is done for the Linkto shortcut in Gmail.

	constructor(id: number, shortcut: string, description: string, innerText?: string, outerHTMLPart?: string, outerHTMLMinLength?: number) {
		this.id = id;
		this.key = shortcut;
		this.description = description;
		this.innerText = innerText;
		this.outerHTMLPart = outerHTMLPart;
		this.outerHTMLMinLength = outerHTMLMinLength;
	}
}
