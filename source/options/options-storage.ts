import OptionsSync from "webext-options-sync";

export default new OptionsSync({
	defaults: {
		gmailOnboardingState: "",
		gmailOnboardingAttempts: 0,
		snoozeUntil: 0,
		snoozeDuration: 24,
		ignoredShortcuts: ""
	},
	migrations: [OptionsSync.migrations.removeUnused],
	logging: true
});
