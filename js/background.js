chrome.runtime.onInstalled.addListener((details) => {
	if (details.reason == "install") {
		chrome.storage.sync.set({ updateMessages: true });
		chrome.storage.sync.set({ indicator: true });
	}

	chrome.storage.sync.set({ "show-update-message": true });
});
