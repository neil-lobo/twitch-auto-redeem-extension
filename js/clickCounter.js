let interval = null;
let lastClick = null;

const MILLIS_DELTA = 5000;
const COUNTER_MAX = 5000;

let counter = 0;

const residentSleeper = new Image();
residentSleeper.src =
	"https://neil-lobo.github.io/twitch-auto-redeem-extension-images/images/default-emotes/residentSleeper.png";

const monkaS = new Image();
monkaS.src =
	"https://neil-lobo.github.io/twitch-auto-redeem-extension-images/images/default-emotes/monkaS.png";

const eleGiggle = new Image();
eleGiggle.src =
	"https://neil-lobo.github.io/twitch-auto-redeem-extension-images/images/default-emotes/eleGiggle.png";

const pauseChamp = new Image();
pauseChamp.src =
	"https://neil-lobo.github.io/twitch-auto-redeem-extension-images/images/default-emotes/pauseChamp.png";

// whole script is this one function
// adds event listener to the fidget rewards button in GUI
document.querySelector("button.img").addEventListener("click", function () {
	lastClick = new Date();
	counter++;
	console.log(`COUNTER: ${counter}`);

	// set interval to check ever 250millis if time delta has been met
	if (interval == null) {
		interval = setInterval(function () {
			//clears interval if greated than time delta
			if (new Date() - lastClick > MILLIS_DELTA) {
				counter = 0;
				clearInterval(interval);
				interval = null;
				console.log("ENDED AFTER 5 SECONDS");
				//reset button
				document.querySelector("button.img").innerHTML =
					'<img src="static/points.svg" width="100%" height="70%" />';
				document.querySelector("button.img").style["background-color"] =
					"#00e5c9";
			}
		}, 250);
		// different counter checkpoints change button icon
	} else if (counter == 10) {
		let img = residentSleeper;
		img.style.height = "70%";

		document.querySelector("button.img").innerHTML = img.outerHTML;
		document.querySelector("button.img").style["background-color"] = "#b01515";
	} else if (counter == 40) {
		let img = monkaS;
		img.style.height = "70%";

		document.querySelector("button.img").innerHTML = img.outerHTML;
		document.querySelector("button.img").style["background-color"] = "#9949ad";
	} else if (counter == 80) {
		let img = eleGiggle;
		img.style.height = "70%";

		document.querySelector("button.img").innerHTML = img.outerHTML;
		document.querySelector("button.img").style["background-color"] = "#13d460";
	} else if (counter == 150) {
		let img = pauseChamp;
		img.style.height = "70%";

		document.querySelector("button.img").innerHTML = img.outerHTML;
		document.querySelector("button.img").style["background-color"] = "#4d4ba3";
	} else if (counter == 300) {
		document.querySelector("button.img").innerHTML =
			"<span style='font-weight:bolder'>🤩</span>";
		document.querySelector("button.img").style["background-color"] = "#deeb59";
		document.querySelector(".star-contianer").style.display = "block";

		//play sound and unlock star if not already unlocked
		chrome.storage.sync.get(["star"], function (result) {
			if (!result.star) {
				let audio = new Audio("static/star_unlocked.wav");
				audio.play();
				chrome.storage.sync.set({ star: true });
			}
		});
	} else if (counter == COUNTER_MAX) {
		document.querySelector("button.img").innerHTML =
			"<span style='font-weight:bolder'>🤖</span>";
		document.querySelector("button.img").style["background-color"] = "#383838";
		document.querySelector(".star-contianer").style.display = "block";
		document.querySelector("#star").style.fill = "#383838";

		//play sound and unlock black star if not already unlocked
		chrome.storage.sync.get(["bot"], function (result) {
			if (!result.bot) {
				let audio = new Audio("static/black_star_unlocked.wav");
				audio.play();
				chrome.storage.sync.set({ bot: true });
			}
		});
	}
});
