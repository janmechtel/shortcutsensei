import { showPopUp } from "../styled-notifications";

function redirectToGmail() {
	const url = 'https://mail.google.com/mail/#settings/general';
	window.location.href = url;
}

function listenForClicks() {
	document.addEventListener("click", (e) => {
		console.debug(e.target);
		if (e.target.id === 'trapButton') {
			alertify.notify(`Haha, you used the mouse! Press "?" instead!`);
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
	.type("When you use the mouse").break()
	.type("instead of the mighty keyboard...")
	.pause(500).break()
	.type("I shall guide you with a notification.")

	.exec(async () => {
		document.getElementById('trapButton').style.display = 'block';
	})
	.go();

//listen for keyboard shortcut `?`
document.addEventListener('keydown', (e) => {
	if (e.key === '?') {
		//showPopUp(`Well done!`, `Now let's configure Gmail`, 0, 'success');
		alertify.notify("Well done! Now let's configure Gmail");
		setInterval(redirectToGmail, 3000);
	}
});
