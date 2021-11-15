require('styled-notifications');

export function closeAllNotificationsExceptSelf(skipTitle?: string) {
	let foundSelf = false;
	// find all elements with class "nfc" and remove them, except if the title is similar to the skipTitle
	const elements = document.getElementsByClassName('ncf');
	//loop through all elements
	for (let i = 0; i < elements.length; i++) {
		//remove the element
		const element = elements[i];
		console.debug(element);
		const title = element.getElementsByClassName('ncf-title')[0].innerHTML;
		console.debug(title);
		if (skipTitle !== undefined && title === skipTitle) {
			foundSelf = true;
			console.debug(`Found similar notification on screen`);
			continue;
		} else {
			elements[i].remove();
		}
	}
	return foundSelf;
}

export const warningNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'warning',
	closeOnClick: true,
	displayCloseButton: true,
	showDuration: 3000,
});

export function showPopUp(title: string, message: string, duration: number, theme?: string) {
	const foundSelf = closeAllNotificationsExceptSelf(title);
	if (!foundSelf) {
		if (theme === undefined) {
			theme = "warning";
		}
		window.createNotification({
			positionClass: 'nfc-bottom-right',
			theme: theme,
			closeOnClick: true,
			displayCloseButton: true,
			showDuration: duration,
		})({
			title: title,
			message: message,
		});
	}
}

export function showKeyPopup(key: string, description: string, duration?: number) {
	if (duration === undefined) {
		duration = 3000;
	}
	const title = `${key}`;
	const message = `For "${description}" try pressing "${key}" instead`;

	return showPopUp(title, message, duration, 'warning')
}
