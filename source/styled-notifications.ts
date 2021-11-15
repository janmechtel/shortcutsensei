require('styled-notifications');

export function closeAllNotifications() {
	// find all elements with class "nfc" and remove them
	const elements = document.getElementsByClassName('nfc');
	while (elements.length > 0) {
		elements[0].remove();
	}
}

export const warningNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
	closeOnClick: true,
	displayCloseButton: true,
	showDuration: 3000,
});

export function showPopUp(title: string, message: string, duration: number, theme?: string) {
	closeAllNotifications();
	if (theme === undefined) {
		theme = "warning";
	}
	window.createNotification({
		positionClass: 'nfc-top-right',
		theme: theme,
		closeOnClick: true,
		displayCloseButton: true,
		showDuration: duration,
	})({
		title: title,
		message: message,
	});
}

export function showKeyPopup(key: string, description: string, duration?: number) {
	if (duration === undefined) {
		duration = 4500;
	}
	const title = `${key}`;
	const message = `For "${description}" try pressing "${key}" instead`;

	return showPopUp(title, message, duration, 'warning')
}
