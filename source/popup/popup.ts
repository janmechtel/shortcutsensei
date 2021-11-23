document.getElementById("options").addEventListener("click", openOptionsPage);

function openOptionsPage() {
	chrome.runtime.openOptionsPage();
}
