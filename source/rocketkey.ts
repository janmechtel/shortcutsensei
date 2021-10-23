document.body.style.border = "5px solid yellow";

document.onclick = function (event) {
    const innerText = event.explicitOriginalTarget.innerText;
    const outerHTML = event.explicitOriginalTarget.outerHTML;
    console.log(`You clicked on: '${innerText}' (innerText)`);
    console.log(`You clicked on: '${outerHTML}' (outerHTML)`);

    if (innerText == "Compose" || outerHTML.includes("Compose")) {
        console.log("Try pressing 'C' instead ;-)")
    }
    console.debug("Click event: ", event);
}
