// wrap reset container element
function reset() {
	return document.getElementById("reset-container");
}

// wrap message container element
function messages() {
	return document.querySelector(".message-container");
}

// display text when hovering over reset icon
reset().addEventListener("mouseover", function () {
	reset().querySelector(".reset-text").style.display = "block";
});

// hide text when hovering over reset icon
reset().addEventListener("mouseout", function () {
	reset().querySelector(".reset-text").style.display = "none";
});

// expand message container when reset icon is clicked
reset()
	.querySelector(".reset-button")
	.addEventListener("click", function () {
		messages().style.height = "50px";
	});

// reset counter if 'yes' button is pressed and close message container
messages()
	.querySelector(".message-yes")
	.addEventListener("click", function () {
		console.log("yes, reset");

		chrome.storage.sync.set({ "rewards-clicked": 0 }, function () {
			console.log("Rewards clicked changed to: 0");
			document.getElementById("value").innerHTML = 0;
		});

		messages().style.height = "0px";
	});

// close message container if 'no' button is pressed
messages()
	.querySelector(".message-no")
	.addEventListener("click", function () {
		console.log("no, canceled");
		messages().style.height = "0px";
	});
