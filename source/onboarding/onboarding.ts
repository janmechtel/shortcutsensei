import alertify = require("alertifyjs");

alertify.dialog("showShortcut", function() {
	return {
		main: function(title, message) {
			this.setHeader(title);
			this.setContent(message);
		},
		setup: function() {
			return {
				options: {
					modal: false,
					maximizable: false,
					closableByDimmer: true,
					pinnable: false
				}
			};
		}
	};
});

function redirectToGmail() {
	const url = "https://mail.google.com/mail/#settings/general";
	window.location.href = url;
}

function listenForClicks() {
	document.addEventListener("click", e => {
		console.debug(e.target);
		if (e.target.id === "trapButton") {
			alertify.showShortcut(
				`Press "?"`,
				`For Gmail onboarding, press "?"`
			);

			setTimeout(() => {
				alertify.showShortcut().close();
			}, 4000);
		}
	});
}

listenForClicks();

new TypeIt("#typeit", {
	waitUntilVisible: true,
	speed: 30
})

	.type("Greetings, my new apprentice... ")
	.pause(500)
	.break()
	.type("I've been expecting you.")
	.break()
	.break()
	.pause(500)
	.type("I am Kei, your Shortcut Sensei.")
	.break()
	.break()
	.pause(500)
	.type("When you use the mouse")
	.break()
	.type("instead of the mighty keyboard...")
	.pause(500)
	.break()
	.type("I shall guide you with a notification.")

	.exec(async () => {
		document.getElementById("trapButton").style.display = "block";
	})
	.go();

//listen for keyboard shortcut `?`
document.addEventListener("keydown", e => {
	if (e.key === "?") {
		alertify.showShortcut(
			`Well done!`,
			`Now let's configure Gmail.`
		);
		setInterval(redirectToGmail, 3000);
	}
});
