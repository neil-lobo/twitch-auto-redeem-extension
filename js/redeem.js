const INDICATOR_SVG = `
<svg id="extension-indicator" width="10" height="10" style="position: absolute; top: 0px; left: 0px;" xmlns="http://www.w3.org/2000/svg" class="svg-inline--fa fa-circle fa-w-16">
	<g>
		<title>Go to auto-redeem extention to turn off this indicator</title>
		<rect fill="none" id="canvas_background" height="12" width="12" y="-1" x="-1"/>
	</g>

	<g>
		<title>Go to auto-redeem extention to turn off this indicator</title>
		<path stroke="null" id="svg_1" d="m5,0.09984c-2.70694,0 -4.90015,2.19321 -4.90015,4.90015s2.19321,4.90015 4.90015,4.90015s4.90015,-2.19321 4.90015,-4.90015s-2.19321,-4.90015 -4.90015,-4.90015z" fill="#a80000"/>
	</g>
</svg>
`;

const INDICATOR_KEYFRAMES = `
@keyframes blip {
  0% {opacity: 0.5}
  88%  {opacity: 0.5}
  100%  {opacity: 1}
}
`;

// download function for debug option
let debug_list = [];
function download(filename, text) {
	var element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", filename);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

// interval to save snapshots of community points element
chrome.storage.sync.get(["debug"], (result) => {
	if (result.debug) {
		setInterval(() => {
			let snapshot = document.querySelector(".community-points-summary")
				.children[1].outerHTML;

			let data = {
				title: "snapshot",
				date: new Date(),
				content: snapshot,
			};
			debug_list.push(data);
			console.log(debug_list);
		}, 60000);
	}
});

// function to wrap custom console.log's
function log(str) {
	console.log(
		"%c׀׀" + "%cAUTO-REDEEM POINTS:" + `%c ${str}`,
		"color:purple;background:white;font-weight:bold;border:solid purple 2px;margin:5px",
		"color:white;background:purple;font-weight:bold",
		"background:none"
	);
}

// create element from html string
function createElementFromHTML(htmlString) {
	var div = document.createElement("div");
	div.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	return div.firstChild;
}

log("EXTENSION START");
chrome.storage.sync.get(["debug"], (result) => {
	if (result.debug) {
		log("DEBUG MORDE ON 🤖");
	}
});

// counter to store channel point mounting attempts
let counter = 0;

// start observer for user change
let target = document.querySelector("head");
var observer = new MutationObserver(function (mutations) {
	log("CHANGED");
	chrome.storage.sync.get(["debug"], (result) => {
		if (result.debug) {
			let data = {
				title: "message",
				date: new Date(),
				content: "mutator detected change",
			};
			debug_list.push(data);
			console.log(debug_list);
		}
	});
	counter = 0;
	connectPoints();
});
let config = { subtree: true, characterData: true };
observer.observe(target, config);
log("OBSERVER STARTED");

// wrap element
function reward() {
	return document.querySelector(".community-points-summary").children[1];
}

// the main part of the script -- detects and clicks channel points
function listenerEvent() {
	log("EVENT!");
	chrome.storage.sync.get(["debug"], (result) => {
		if (result.debug) {
			let data = {
				title: "message",
				date: new Date(),
				content: "mutation observer event dispatched",
			};
			debug_list.push(data);
			console.log(debug_list);
		}
	});

	// attempt a click on reward after 0.5s
	setTimeout(async function () {
		try {
			reward().querySelector("button").click();

			// get counter from chrome storage and set it locally
			let currentCount = 0;
			chrome.storage.sync.get(["rewards-clicked"], function (result) {
				if (result["rewards-clicked"]) {
					currentCount = result["rewards-clicked"];
				}

				// increment and set counter to chrom storage
				currentCount++;
				chrome.storage.sync.set(
					{ "rewards-clicked": currentCount },
					function () {
						log(`Rewards clicked changed to: ${currentCount}`);
					}
				);
			});

			log("CLICKED!");

			chrome.storage.sync.get(["debug"], (result) => {
				if (result.debug) {
					let data = {
						title: "message",
						date: new Date(),
						content: "points clicked",
					};
					debug_list.push(data);
					console.log(debug_list);
				}
			});
		} catch (err) {
			// if reward is not yet available
			chrome.storage.sync.get(["debug"], (result) => {
				if (result.debug) {
					let data = {
						title: "message",
						date: new Date(),
						content: "nothing to click",
					};
					debug_list.push(data);
					console.log(debug_list);
				}
			});
		}
	}, 500);
}

// function to mount channel points element
function connectPoints() {
	// attempt every 2s
	let interval = setInterval(() => {
		try {
			// if points element is detected, stop the interval
			document.querySelector(".community-points-summary").children[1];
			log("POINTS LOADED!");

			chrome.storage.sync.get(["debug"], (result) => {
				if (result.debug) {
					let data = {
						title: "message",
						date: new Date(),
						content: "points loaded",
					};
					debug_list.push(data);
					console.log(debug_list);
				}
			});

			clearInterval(interval);
			main();
		} catch {
			// after 10 attempts (≈20s) stop trying to mount
			if (counter >= 10) {
				clearInterval(interval);
				log("POINTS CONNECTION TIMEOUT");
				chrome.storage.sync.get(["debug"], (result) => {
					if (result.debug) {
						let data = {
							title: "error",
							date: new Date(),
							content: "points connection timeout",
						};
						debug_list.push(data);
						console.log(debug_list);
					}
				});
			}
			counter++;
			log(`(${counter} TRIES) POINTS NOT LOADED YET, TRYING AGAIN`);
		}
	}, 2000);
}

// function to add mutation observer to points element to detect DOM changes
// also append indicator to show plugin is watching channel points
let points_observer = null;
function main() {
	// add points mutation observer
	try {
		let points_target = document.querySelector(".community-points-summary")
			.children[1];
		const points_config = { childList: true, subtree: true };
		points_observer = new MutationObserver(listenerEvent);
		points_observer.observe(points_target, points_config);

		log("POINTS MUTATION OBSERVER ADDED");
		chrome.storage.sync.get(["debug"], (result) => {
			if (result.debug) {
				let data = {
					title: "message",
					date: new Date(),
					content: "points mutation observer added successfully",
				};
				debug_list.push(data);
				console.log(debug_list);
			}
		});

		// append indicator if setting is on
		chrome.storage.sync.get(["indicator"], (result) => {
			if (result.indicator) {
				let target = document.querySelector(".community-points-summary")
					.children[0];
				if (target.childNodes[target.childNodes.length - 1].tagName != "svg") {
					let indicator = createElementFromHTML(INDICATOR_SVG);

					let style = document.createElement("style");
					style.innerHTML = INDICATOR_KEYFRAMES;
					document.getElementsByTagName("head")[0].appendChild(style);
					indicator.style.animation = "blip 2.5s ease alternate infinite";

					target.appendChild(indicator);
					log("ADDED INDICATOR");

					chrome.storage.sync.get(["debug"], (result) => {
						if (result.debug) {
							indicator.addEventListener("click", function () {
								let data = {
									debug_list,
								};

								debug_list = [];
								download("debug.json", JSON.stringify(data));
							});
						}
					});
				}
			}
		});
	} catch (err) {
		chrome.storage.sync.get(["debug"], (result) => {
			if (result.debug) {
				let data = {
					title: "error adding mutation observer",
					date: new Date(),
					content: err,
				};
				debug_list.push(data);
				console.log(debug_list);
			}
		});
	}
}

// first and only function called in gloabal scope
connectPoints();
