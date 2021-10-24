export class Shortcut {
	key: string; // the shortcut key sequence, eg. 'Shift+C'
	button: string; // the content ont the Text or OuterHTML, eg. 'Compose'
	description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'

	constructor(shortcut: string, description: string, button?: string) {
		this.key = shortcut;
		this.description = description;
		this.button = button;
	}
}
