// wrap settings container element
function settings() {
	return document.getElementById("settings-container");
}

function menu() {
	return document.getElementById("settings-menu-container");
}

// display text when hovering over settings icon
settings().addEventListener("mouseover", function () {
	settings().querySelector(".settings-text").style.display = "block";
});

// hide text when hovering over settings icon
settings().addEventListener("mouseout", function () {
	settings().querySelector(".settings-text").style.display = "none";
});

// expand settings menu when settings icon is clicked
settings()
	.querySelector(".settings-button")
	.addEventListener("click", function () {
		document.getElementById("settings-menu-container").style.height = "100vh";
	});

// close settings menu when close icon is clicked
menu()
	.querySelector("#settings-menu-close")
	.addEventListener("click", function () {
		document.getElementById("settings-menu-container").style.height = "0";
	});

menu()
	.querySelector("#show-changeLog")
	.addEventListener("click", function () {
		document.getElementById("update-message-container").style.height = "100vh";
	});

// set all switches' widths equal to their heights -- add event on click to toggle switch
let switches = document.getElementsByClassName("switch");
for (let item of switches) {
	let slider = item.querySelector(".slider");
	slider.style.width = slider.offsetHeight + "px";

	item.addEventListener("click", function () {
		item.querySelector(".spacer").classList.toggle("on");
		item.classList.toggle("on");

		let id = item.id.split("-")[1];
		console.log([id]);
		chrome.storage.sync.get([id], (result) => {
			let toggle = false;
			if (result[id]) {
				toggle = result[id];
			}
			let newToggle = !toggle;
			console.log(`from ${toggle} to ${newToggle}`);

			let data = {};
			data[id] = newToggle;
			chrome.storage.sync.set(data);
		});
	});
}

// set switch positions from storage
chrome.storage.sync.get(["indicator", "debug", "updateMessages"], (result) => {
	if (result.indicator) {
		document.getElementById("toggle-indicator").classList.add("on");
		document
			.getElementById("toggle-indicator")
			.querySelector(".spacer")
			.classList.add("on");

		console.log("indicator on");
	}

	if (result.debug) {
		document.getElementById("toggle-debug").classList.add("on");
		document
			.getElementById("toggle-debug")
			.querySelector(".spacer")
			.classList.add("on");

		console.log("debug on");
	}

	if (result.updateMessages) {
		document.getElementById("toggle-updateMessages").classList.add("on");
		document
			.getElementById("toggle-updateMessages")
			.querySelector(".spacer")
			.classList.add("on");

		console.log("update messages on");
	}
});
