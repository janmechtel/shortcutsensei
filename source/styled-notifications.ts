export function closeAllNotifications() {
	// find all elements with class "nfc" and remove them
	const elements = document.getElementsByClassName('ncf');
	while (elements.length > 0) {
		elements[0].remove();
	}
}
