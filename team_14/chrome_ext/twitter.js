let tweetWindowClasses = "css-1dbjc4n r-eqz5dr r-16y2uox r-1wbh5a2";
let headlineClasses = "css-1dbjc4n r-1d09ksm r-18u37iz r-1wbh5a2";
let extensionAtributteMark = "Mf4U4L";
let treshold = 0.7;

const delay = ms => new Promise(res => setTimeout(res, ms));

class Tweet {
    constructor(htmlObject) {
        this.htmlObject = htmlObject;
        this.id = htmlObject.innerHTML.match(/status\/[0-9]+/g)[0].substring(7);
        this.headlineHtml = htmlObject.getElementsByClassName(headlineClasses).item(0);
    }

    async getStatus() {
        // based on local storage value response

        let status = (await chrome.storage.local.get(null))["ids"][this.id];
        return status;
    }
    
    async setStatus(status) {
        // code to save marks to localstorage

        let ids = (await chrome.storage.local.get(null))["ids"];
        ids[this.id] = status;
        await chrome.storage.local.set({ids: ids});
    }
}

async function getMarkModel(warn) {
    let mark = document.createElement('div');

    mark.style.position = 'relative';
    mark.style.fontWeight = 'bold';
    mark.style.width = '20px';
    mark.style.height = '20px';
    mark.style.marginLeft = '20px';
    mark.style.borderRadius = '50%';
    mark.style.textAlign = 'center';
    mark.style.color = '#ffffff'
    mark.style.border = 'solid #ffffff 1px';

    if (warn) {
        mark.style.background = 'red';
    } else {
        mark.style.background = '-webkit-linear-gradient(top, #0057b7 50%, #ffd700 50%)';
    }

    return mark;
}

function getUnmarkedTweets(all) {
    let tweetsAndPrompts = Array.from(document.getElementsByClassName(tweetWindowClasses));
    let tweets = [];
    let ids = [];
    for (let box of tweetsAndPrompts) {
        let hasAttr = all ? true : (!box.getAttribute(extensionAtributteMark))
        if (box.innerHTML.match(/status\/[0-9]+/gi) && hasAttr && (box.innerHTML.match(/Ukraine/gi))) {
            let tweet = new Tweet(box);
            tweet["htmlObject"].setAttribute(extensionAtributteMark, extensionAtributteMark);
            if (!ids.includes(tweet.id)) {
                ids.push(tweet.id);
                tweets.push(new Tweet(box));
            }
        }
    }
    return tweets;
}

function getTweetById(id) {
    let tweets = getUnmarkedTweets(true);
    let tweet = tweets.filter(x => x.id === id);
    console.log("tweet: " + id);
    return tweet.length == 0 ? undefined : tweet[0];
}

async function markTweet(tweet) {
    tweet.headlineHtml.appendChild(await getMarkModel(false));
    if (await tweet.getStatus()) {
        tweet.headlineHtml.appendChild(await getMarkModel(true));
    }
}

function covertRequestToStatus(res) {
    return res > treshold ? true : false;
}

async function markTweets() {
    let tweets = getUnmarkedTweets(false);
    for (let tweet of tweets) {
        if ((await tweet.getStatus()) === undefined) {
            
            console.log("send request for: " + tweet.id)
            chrome.runtime.sendMessage(tweet.id);

        } else {
            console.log("Find in storage: " + tweet.id);
            markTweet(tweet);
        }
    }
}

async function startup() {

    chrome.runtime.onMessage.addListener(async function(res) {
        console.log(Object.keys(res)[0]);
        console.log(res);
        let tweet = getTweetById(Object.keys(res)[0]);
        if (tweet !== undefined) {
            console.log(tweet.innerHTML);
            let status = covertRequestToStatus(res[Object.keys(res)[0]]);
            await tweet.setStatus(status);
            markTweet(tweet);
        } else {
            console.log("tweet not found");
        }
    });

    if (!(await chrome.storage.local.get(null))["ids"]) {
        await chrome.storage.local.set({ids: {}});
    }

    let sessionStarted = window.sessionStorage.getItem("sessionStarted")? true : false;
    if (!sessionStarted) {
        console.log('new session');
        window.sessionStorage.setItem("sessionStarted", true);
        await chrome.storage.local.set({"isEnabled" : false});

        // clear storage
        await chrome.storage.local.set({ids: {}});

    }

    isEnabled = (await chrome.storage.local.get("isEnabled")).isEnabled;

    if (isEnabled) {

        await delay(5000);
        tweetsParent = document.getElementsByTagName("section")[0].children.item(1).children.item(0);
        console.log("add observer");
        const observer = new MutationObserver(markTweets);
        config = {childList : true};

        observer.observe(tweetsParent, config);
    }
}

startup();

