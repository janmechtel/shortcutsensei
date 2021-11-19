import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
		gmailOnboardingState: "",
		gmailOnboardingAttempts: 0,
		snoozeUntil: 0,
	},
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
});
