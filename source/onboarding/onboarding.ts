require('styled-notifications');
import {closeAllNotifications} from "../styled-notifications";

const successNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	theme: 'success',
	closeOnClick: true,
	displayCloseButton: true,
	showDuration: 0,
});

const warningNotification = window.createNotification({
	positionClass: 'nfc-bottom-right',
	displayCloseButton: true,
	theme: 'warning',
	showDuration: 0,
});

function redirectToGmail() {
	const url = 'https://mail.google.com/mail/#settings/general';
	window.location.href = url;
}

function listenForClicks() {
	document.addEventListener("click", (e) => {
		closeAllNotifications();
		console.debug(e.target);
		if (e.target.name === 'trapButton') {
			warningNotification({
				title: `Haha, you used the mouse!`,
				message: `Press "Alt+Shift+X" instead!`,
			});
		} else if (e.target.name === 'hiddenButton') {
			successNotification({
				title: `Well done!`,
				message: `Now we configure Gmail`,
			});
			setInterval(redirectToGmail, 3000);
		}
	});
}


listenForClicks();
