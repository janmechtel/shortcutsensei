document.body.style.border = "5px solid yellow";
// Create a success notification instance
require('styled-notifications');

const successNotification = window.createNotification({
	// closeOnClick: true,
	// displayCloseButton: false,
	// positionClass: 'nfc-top-right',
	// onclick: false,
	// showDuration: 3500,
	// theme: 'success'
	positionClass: 'nfc-bottom-right',
	theme: 'information'
});

document.onclick = function (event) {
    const innerText = event.explicitOriginalTarget.innerText;
    const outerHTML = event.explicitOriginalTarget.outerHTML;
    console.log(`You clicked on: '${innerText}' (innerText)`);
    console.log(`You clicked on: '${outerHTML}' (outerHTML)`);
	console.debug("Click event: ", event);

    if (innerText == "Compose" || outerHTML.includes("Compose")) {
        console.log("")
		// Use the same instance but pass a title
		successNotification({
			title: 'Press C',
			message: 'For "Compose" try pressing "C" instead ;-)'
		});

    }
}
