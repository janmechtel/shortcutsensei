// Don't forget to import this wherever you use it // import browser from 'webextension-polyfill';

import optionsStorage from './options-storage';

optionsStorage.syncForm('#options-form');

// when the snooze button is pressed, save the snooze time and close the options page
document.getElementById('snooze').addEventListener('click', () => {
	const snoozeUntil = new Date().getTime() + 24 * 60 * 1000;
	const snoozeUntilInput = document.querySelectorAll('input[type="number"][name^="snoozeUntil"]').item(0);
	optionsStorage.set({snoozeUntil: snoozeUntil});
	snoozeUntilInput.value = snoozeUntil;
	// alert('Snooze until: ' + new Date(snoozeUntil).toLocaleString() + snoozeUntilInput.value);
});
