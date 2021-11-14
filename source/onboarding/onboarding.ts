import { showPopUp } from "../styled-notifications";

function redirectToGmail() {
	const url = 'https://mail.google.com/mail/#settings/general';
	window.location.href = url;
}

function listenForClicks() {
	document.addEventListener("click", (e) => {
		console.debug(e.target);
		if (e.target.id === 'trapButton') {
			showPopUp(`Haha, you used the mouse!`, `Press "Alt+Shift+X" instead!`, 0, 'warning');
		} else if (e.target.id === 'hiddenButton') {
			showPopUp(`Well done!`, `Now let's configure Gmail`, 0, 'success');
			setInterval(redirectToGmail, 3000);
		}
	});
}

listenForClicks();

new TypeIt("#typeit", {
	waitUntilVisible: true,
	speed: 30,
})

	.type("Greetings, my new apprentice... ").pause(500)
	.break().type("I've been expecting you.").break()
	.break().pause(500)
	.type("I am Kei, your Shortcut Sensei.").break()
	.break().pause(500)
	.type("When you use the mouse instead of the mighty keyboard...")
	.type(" of the mighty keyboard...").break()
	.pause(500).break()
	.type("I shall guide you with a notification.")

	.exec(async () => {
		document.getElementById('trapButton').style.display = 'block';
	})
	.go();
