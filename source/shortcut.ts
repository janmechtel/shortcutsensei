export class Shortcut {
	key: string; // the shortcut key sequence, eg. 'Shift+C'
	description: string; // what does this shortcut do? The description for the cheatsheet, eg 'Compose a new message'
	button: string; // the content ont the Text or OuterHTML, eg. 'Compose'

	constructor(shortcut: string, description: string, button?: string) {
		this.key = shortcut;
		this.description = description;
		this.button = button;
	}
}
