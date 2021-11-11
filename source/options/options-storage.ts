import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
		gmailOnboardingCompleted: false,
	},
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
});
