// Don't forget to import this wherever you use it // import browser from 'webextension-polyfill';

import optionsStorage from './options-storage';

optionsStorage.syncForm('#options-form');

document.getElementById('snooze').addEventListener('click', () => {
	setSnoozeUntil(24);
});

document.getElementById('snoozeReset').addEventListener('click', () => {
	setSnoozeUntil(0);
});

function setSnoozeUntil(hours: number) {
	//assign constant to 0 if hours is 0 otherwise assign hours to Date + hours
	const snoozeUntil = hours === 0 ? 0 : new Date().getTime() + hours * 60 * 1000;
	const snoozeUntilInput = document.querySelectorAll('input[type="number"][name^="snoozeUntil"]').item(0);
	optionsStorage.set({ snoozeUntil: snoozeUntil });
	snoozeUntilInput.value = snoozeUntil;
	alert('Snooze until: ' + new Date(snoozeUntil).toLocaleString() + snoozeUntilInput.value);
}

