import { showPopUp } from "../styled-notifications";

function redirectToGmail() {
	const url = 'https://mail.google.com/mail/#settings/general';
	window.location.href = url;
}

function listenForClicks() {
	document.addEventListener("click", (e) => {
		console.debug(e.target);
		if (e.target.name === 'trapButton') {
			showPopUp(`Haha, you used the mouse!`, `Press "Alt+Shift+X" instead!`, 0, 'warning');
		} else if (e.target.name === 'hiddenButton') {
			showPopUp(`Well done!`, `Now we configure Gmail`, 0, 'success');
			setInterval(redirectToGmail, 3000);
		}
	});
}

listenForClicks();

//wait until the #typeit element is loaded
document.addEventListener("DOMContentLoaded", function (event) {
	new TypeIt("#typeit", {
		strings: "Ahh ... the new apprentice",
		speed: 75,
		loop: true,
	}).go();
});
