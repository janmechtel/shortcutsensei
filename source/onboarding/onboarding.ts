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
			showPopUp(`Well done!`, `Now we configure Gmail`, 0, 'success');
			setInterval(redirectToGmail, 3000);
		}
	});
}

listenForClicks();

new TypeIt("#typeit", {
	waitUntilVisible: true,
	speed: 50,
})
	.type("Ahh ").pause(250).type("... ").pause(750).type("the new apprentice").break()
	.break().pause(750)
	.type("I am Ki.").pause(500).type(" Your Shortcut Sensei").break()
	.break().pause(750)
	.type("	When you use the mouse ").pause(250).type("... ").break()
	.pause(750).type("instead of the mighty keyboard").pause(250).type("... ").break()
	.break().pause(750)
	.type("I shall guide you with a notification.")
	.break().pause(750)
	.exec(async () => {
		document.getElementById('trapButton').style.display = 'block';
	})
	.go();
