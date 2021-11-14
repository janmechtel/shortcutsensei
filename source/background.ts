import './options/options-storage.ts';

chrome.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
	// if (temporary) return; // skip during development
	if (temporary) console.debug("temporary"); // skip during development
	switch (reason) {
		case "install":
			{
				const url = chrome.runtime.getURL("onboarding/onboarding.html");
				await chrome.tabs.create({ url });

				// or: await chrome.windows.create({ url, type: "popup", height: 600, width: 600, });
			}
			break;
		// see below
	}
});
