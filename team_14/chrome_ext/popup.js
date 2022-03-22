let isEnabled;

function isTwitter(url) {
    return url.includes("//twitter.com/");
}

function setBtnStyle(button, isTwitt, isEnabled) {
    button.removeAttribute("class");
    button.classList.add("btn");
    if (isEnabled) {
        button.innerText = "Extension on";
        button.classList.add("btn-success");
    } else {
        button.innerText = "Extension off";
        button.classList.add("btn-danger");
    }
}

function setPopupInfo(isTwitt, isEnabled, isOnInit) {
    let paragraph = document.getElementById("popup-info");
    let textToDisplay = "";

    if (isOnInit & isEnabled) {
        textToDisplay = "Extension is enabled in this session.";
    } else if (isEnabled & !isTwitt) {
        textToDisplay = "Extension will run as soon as you open twitter in this tab.";
    } else if (isEnabled & isTwitt) {
        textToDisplay = "Please reload your tab.";
    }

    paragraph.innerText = textToDisplay;
}

function setPop(isTwitt, isEnabled) {

    let button = document.getElementById("mark-tweets");

    setBtnStyle(button, isTwitt, isEnabled);
    setPopupInfo(isTwitt, isEnabled, true);

    button.addEventListener("click", async () => {
        isEnabled = !isEnabled;
        await chrome.storage.local.set({"isEnabled" : isEnabled});
        setBtnStyle(button, isTwitt, isEnabled, false);
        setPopupInfo(isTwitt, isEnabled);
    });

}

async function startup() {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    isEnabled = (await chrome.storage.local.get("isEnabled")).isEnabled;
    let isTwitt = isTwitter(tab["url"]);

    setPop(isTwitt, isEnabled);
}

window.onload = startup;