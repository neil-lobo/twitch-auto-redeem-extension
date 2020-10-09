//cursor animation in title of gui and settings menu
setInterval(() => {
	// let title = document.getElementById("title").innerText;
	let texts = document.getElementsByClassName("cursor");

	for (item of texts) {
		let inner_text = item.innerText;

		item.querySelector("span").innerText =
			inner_text[inner_text.length - 1] == "_" ? "" : "_";
	}
}, 600);
