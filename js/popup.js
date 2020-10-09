// scrip runs when gui is opened
document.body.onload = function () {
	chrome.storage.sync.get(["rewards-clicked", "star", "bot"], (result) => {
		// sets element to counter number
		if (!result["rewards-clicked"]) {
			document.querySelector("#value").innerHTML = 0;
		} else {
			document.querySelector("#value").innerHTML = result["rewards-clicked"];
		}
		console.log(`rewards clicked: ${result["rewards-clicked"]}`);

		//enables star if achieved
		if (result.star) {
			document.querySelector(".star-contianer").style.display = "block";
		}

		//enables black star if achieved
		if (result.bot) {
			document.querySelector(".star-contianer").style.display = "block";
			document.querySelector("#star").style.fill = "#383838";
		}
	});
};
