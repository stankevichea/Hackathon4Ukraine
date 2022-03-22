chrome.runtime.onInstalled.addListener(() => {

    chrome.runtime.onMessage.addListener(
        async function(id) {
            console.log(id)
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            url = "http://3.95.166.204:5000/id/" + id;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let id = tab["id"];
                    chrome.tabs.sendMessage(
                        id,
                        data
                      )
                });
        }
        )
  });