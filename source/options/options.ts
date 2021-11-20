// Don't forget to import this wherever you use it // import browser from 'webextension-polyfill';
import optionsStorage from './options-storage';

optionsStorage.syncForm('#options-form');

async function loadSnoozeUntil() {
	const options = await optionsStorage.getAll();
	console.log(options);
	setSnoozeUntil(options.snoozeUntil as number);
}

document.getElementById('snooze').addEventListener('click', () => {
	const hours = 24;
	setSnoozeUntil(new Date().getTime() + hours * 60 * 1000);
});

document.getElementById('snoozeReset').addEventListener('click', () => {
	setSnoozeUntil(new Date().getTime());
});

function setSnoozeUntil(snoozeUntil: number) {

	const snoozeOnSection = document.getElementById('snoozeOnSection');
	const snoozeOffSection = document.getElementById('snoozeOffSection');
	const snoozeMessageSpan = document.getElementById('snoozeMessage');

	if (snoozeUntil > new Date().getTime()) {
		snoozeOnSection.style.display = 'none';
		snoozeOffSection.style.display = 'block';
		snoozeMessageSpan.textContent = `Snoozing until ${new Date(snoozeUntil).toLocaleTimeString()}`;
	} else {
		snoozeOnSection.style.display = 'block';
		snoozeOffSection.style.display = 'none';
		snoozeMessageSpan.textContent = `Snooze disabled ${snoozeUntil}`;
	}
	optionsStorage.set({ snoozeUntil: snoozeUntil });
}

loadSnoozeUntil();
