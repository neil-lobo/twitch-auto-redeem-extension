function closeUpdateMessages() {
	document.getElementById("update-message-container").style.height = "0";
	chrome.storage.sync.set({ "show-update-message": false }, function () {
		console.log("closed update messages");
	});
}

document
	.getElementById("update-message-card")
	.addEventListener("click", (event) => {
		event.stopPropagation();
	});

document
	.getElementById("update-message-card-close")
	.addEventListener("click", function () {
		closeUpdateMessages();
	});

document
	.getElementById("update-message-container")
	.addEventListener("click", function () {
		closeUpdateMessages();
	});

chrome.storage.sync.get(["show-update-message"], (result) => {
	if (result["show-update-message"]) {
		document.getElementById("update-message-container").style.height = "100vh";
	}
});
